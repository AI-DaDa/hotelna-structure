import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import type { z } from 'zod'
import { contactFormSchema, sanitizeInput, analyzeContent, validateEnv, type SpamAnalysis } from '@/lib/validation'
import { validateEmail, shouldBlockEmail, getEmailErrorMessage } from '@/lib/email-validation'
import { logger } from '@/lib/logger'
import { contactFormRateLimit } from '@/lib/rate-limit'

// Type definitions
type ContactFormData = z.infer<typeof contactFormSchema>
type ValidatedEnvConfig = ReturnType<typeof validateEnv>

// Interface for email validation result (matching the one in email-validation.ts)
interface EmailValidationResult {
  isValid: boolean
  isDisposable: boolean
  isFreeEmail: boolean
  confidence: number
  provider?: string
  reason?: string
}

// Interface for rate limiting result (matching the one in rate-limit.ts)
interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
  error?: string
}

// Validate environment variables on startup
let envConfig: ValidatedEnvConfig
try {
  envConfig = validateEnv()
} catch (error) {
  logger.error('Environment validation failed', { error: error instanceof Error ? error.message : 'Unknown error' })
  throw error
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now()

  // Enhanced client IP detection
  const getClientIP = (req: NextRequest): string => {
    // Check multiple headers in order of priority
    const forwardedFor = req.headers.get('x-forwarded-for')
    const realIP = req.headers.get('x-real-ip')
    const cfConnectingIP = req.headers.get('cf-connecting-ip') // Cloudflare
    const clientIP = req.headers.get('client-ip')
    const forwarded = req.headers.get('forwarded')

    // Handle x-forwarded-for (can contain multiple IPs)
    if (forwardedFor) {
      const ips = forwardedFor.split(',').map(ip => ip.trim())
      // Return the first non-private IP, or the first IP if all are private
      for (const ip of ips) {
        if (ip && !isPrivateIP(ip)) {
          return ip
        }
      }
      return ips[0] || 'unknown'
    }

    // Check other headers
    if (cfConnectingIP) return cfConnectingIP
    if (realIP) return realIP
    if (clientIP) return clientIP

    // Parse forwarded header
    if (forwarded) {
      const forMatch = forwarded.match(/for=([^;,\s]+)/)
      if (forMatch) {
        return forMatch[1].replace(/"/g, '')
      }
    }

    // Fallback to connection info (for development)
    return '127.0.0.1'
  }

  // Helper function to check if IP is private
  const isPrivateIP = (ip: string): boolean => {
    const privateRanges = [
      /^127\./, // 127.0.0.0/8
      /^10\./, // 10.0.0.0/8
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./, // 172.16.0.0/12
      /^192\.168\./, // 192.168.0.0/16
      /^::1$/, // IPv6 localhost
      /^fc00:/, // IPv6 private
      /^fe80:/ // IPv6 link-local
    ]
    return privateRanges.some(range => range.test(ip))
  }

  const clientIP: string = getClientIP(request)

  try {
    // Additional rate limiting check (middleware handles this too, but double-check)
    const rateLimitResult: RateLimitResult = await contactFormRateLimit(request)
    if (!rateLimitResult.success) {
      logger.rateLimitExceeded(clientIP, '/api/contact', rateLimitResult.limit)
      return NextResponse.json(
        { error: 'Too many requests. Please wait before trying again.' },
        { status: 429 }
      )
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      logger.securityEvent('Invalid JSON in contact form', clientIP)
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }

    // Validate input schema
    const validation = contactFormSchema.safeParse(body)
    if (!validation.success) {
      logger.securityEvent('Schema validation failed', clientIP, {
        errors: validation.error.issues.map((e) => `${e.path.join('.')}: ${e.message}`)
      })
      return NextResponse.json(
        { error: 'Invalid form data', details: validation.error.issues[0]?.message },
        { status: 400 }
      )
    }

    const { name, email, subject, message, timestamp }: ContactFormData = validation.data

    // Timestamp validation (prevent too fast submissions)
    if (timestamp && (Date.now() - timestamp) < 3000) {
      logger.securityEvent('Submission too fast', clientIP, { timeDiff: Date.now() - timestamp })
      return NextResponse.json(
        { error: 'Please slow down and try again' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name)
    const sanitizedSubject = sanitizeInput(subject)
    const sanitizedMessage = sanitizeInput(message)

    // Enhanced email validation
    const emailValidation: EmailValidationResult = await validateEmail(email)

    if (shouldBlockEmail(emailValidation)) {
      logger.securityEvent('Email blocked', clientIP, {
        email: email.replace(/(.{3}).*(@.*)/, '$1***$2'),
        reason: emailValidation.reason || 'Failed validation',
        isDisposable: emailValidation.isDisposable,
        confidence: emailValidation.confidence
      })

      return NextResponse.json(
        { error: getEmailErrorMessage(emailValidation) },
        { status: 400 }
      )
    }

    // Enhanced spam detection
    const contentAnalysis: SpamAnalysis = analyzeContent(`${sanitizedName} ${sanitizedSubject} ${sanitizedMessage}`)
    if (contentAnalysis.isSpam) {
      logger.spamDetected(clientIP, contentAnalysis.reasons.join(', '), `${sanitizedName} ${sanitizedSubject} ${sanitizedMessage}`)
      return NextResponse.json(
        { error: 'Your message appears to be spam. Please revise and try again.' },
        { status: 400 }
      )
    }

    // Create transporter using validated environment variables
    const transporter = nodemailer.createTransport({
      host: envConfig.SMTP_HOST,
      port: parseInt(envConfig.SMTP_PORT),
      secure: envConfig.SMTP_SECURE === 'true',
      auth: {
        user: envConfig.SMTP_USER,
        pass: envConfig.SMTP_PASS,
      },
      // Additional security options
      tls: {
        rejectUnauthorized: true,
        minVersion: 'TLSv1.2'
      }
    })

    // Verify transporter configuration
    try {
      await transporter.verify()
    } catch (error) {
      logger.error('SMTP configuration failed', { error: error instanceof Error ? error.message : 'Unknown error' })
      return NextResponse.json(
        { error: 'Email service is currently unavailable. Please try again later.' },
        { status: 503 }
      )
    }

    // Email content for the business owner
    const businessEmailOptions: nodemailer.SendMailOptions = {
      from: envConfig.SMTP_FROM_EMAIL,
      to: envConfig.CONTACT_EMAIL,
      subject: `New Hotelna Inquiry: ${sanitizedSubject}`,
      html: `
        <div style="font-family: 'Dubai', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; border-bottom: 3px solid #d5b15f; padding-bottom: 20px; margin-bottom: 20px;">
              <h1 style="color: #d5b15f; margin: 0; font-size: 28px; font-weight: bold;">New Client Inquiry</h1>
              <p style="color: #666; margin: 10px 0 0 0; font-size: 16px;">Hotelna Hospitality Consultancy</p>
            </div>

            <div style="margin-bottom: 20px;">
              <h3 style="color: #d5b15f; margin-bottom: 5px;">Contact Details:</h3>
              <p style="margin: 5px 0; color: #666;"><strong>Name:</strong> ${sanitizedName}</p>
              <p style="margin: 5px 0; color: #666;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0; color: #666;"><strong>Subject:</strong> ${sanitizedSubject}</p>
            </div>

            <div style="margin-bottom: 20px;">
              <h3 style="color: #d5b15f; margin-bottom: 10px;">Message:</h3>
              <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; border-left: 4px solid #d5b15f;">
                <p style="color: #333; line-height: 1.6; margin: 0;">${sanitizedMessage.replace(/\\n/g, '<br>')}</p>
              </div>
            </div>

            <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 20px;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                This email was sent from the Hotelna contact form at ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission

        Name: ${sanitizedName}
        Email: ${email}
        Subject: ${sanitizedSubject}

        Message:
        ${sanitizedMessage}

        Sent at: ${new Date().toLocaleString()}
      `
    }

    // Auto-reply email for the user
    const autoReplyOptions: nodemailer.SendMailOptions = {
      from: envConfig.SMTP_FROM_EMAIL,
      to: email,
      subject: 'Thank you for contacting Hotelna - Your inquiry has been received',
      html: `
        <div style="font-family: 'Dubai', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; border-bottom: 3px solid #d5b15f; padding-bottom: 20px; margin-bottom: 20px;">
              <h1 style="color: #d5b15f; margin: 0; font-size: 28px; font-weight: bold;">Thank You for Your Inquiry!</h1>
              <p style="color: #666; font-size: 16px; margin: 10px 0 0 0;">Hotelna Hospitality Consultancy</p>
            </div>

            <div style="margin-bottom: 25px;">
              <p style="color: #333; line-height: 1.6; margin-bottom: 15px;">Dear ${sanitizedName},</p>
              <p style="color: #333; line-height: 1.6; margin-bottom: 15px;">
                Thank you for your interest in Hotelna Hospitality Consultancy! We've successfully received your inquiry and I will personally review it shortly.
              </p>
              <p style="color: #333; line-height: 1.6; margin-bottom: 15px;">
                As a boutique consultancy specializing in elevating hospitality experiences, I'm committed to providing personalized attention to each inquiry. You can expect a response within 24-48 hours during business days.
              </p>
              <p style="color: #333; line-height: 1.6; margin-bottom: 15px;">
                For urgent matters, please feel free to call me directly on +447968710903 .
              </p>
            </div>

            <div style="background-color: #f8f8f8; padding: 20px; border-radius: 5px; border-left: 4px solid #d5b15f; margin-bottom: 25px;">
              <h3 style="color: #d5b15f; margin-top: 0; margin-bottom: 10px;">Your Message Summary:</h3>
              <p style="margin: 5px 0; color: #666;"><strong>Subject:</strong> ${sanitizedSubject}</p>
              <div style="margin-top: 15px;">
                <p style="margin: 0 0 10px 0; color: #666;"><strong>Your Message:</strong></p>
                <div style="background-color: #ffffff; padding: 15px; border-radius: 5px; border: 1px solid #e0e0e0;">
                  <p style="color: #333; line-height: 1.6; margin: 0;">${sanitizedMessage.replace(/\\n/g, '<br>')}</p>
                </div>
              </div>
              <p style="margin: 15px 0 5px 0; color: #666;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>

            <div style="margin-bottom: 25px;">
              <h3 style="color: #d5b15f; margin-bottom: 10px;">Contact Information:</h3>
              <p style="margin: 5px 0; color: #666;"><strong>Email:</strong> sk@hotelna.co.uk</p>
              <p style="margin: 5px 0; color: #666;"><strong>Website:</strong> hotelna.co.uk</p>
              <p style="margin: 5px 0; color: #666;"><strong>Consultancy:</strong> Hotelna Hospitality Consultancy</p>
            </div>

            <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 25px; text-align: center;">
              <p style="color: #333; line-height: 1.6; margin-bottom: 10px;">
                Best regards,<br>
                <strong style="color: #d5b15f;">Solomon Khaddour</strong><br>
                <span style="color: #666;">Founder & Principal Consultant</span><br>
                <strong style="color: #d5b15f;">Hotelna Hospitality Consultancy</strong>
              </p>
              <p style="color: #999; font-size: 12px; margin: 0;">
                This is an automated response. Please do not reply to this email.
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
        Hi ${sanitizedName},

        Thank you for reaching out to us! We've successfully received your message and our team will review it shortly.

        We typically respond to inquiries within 24-48 hours during business days. If your matter is urgent, please don't hesitate to call us directly.

        Your Message Summary:
        Subject: ${sanitizedSubject}

        Your Message:
        ${sanitizedMessage}

        Submitted: ${new Date().toLocaleString()}

        Contact Information:
        Email: sk@hotelna.co.uk
        Website: hotelna.co.uk
        Consultancy: Hotelna Hospitality Consultancy

        Best regards,
        Solomon Khaddour
        Founder & Principal Consultant
        Hotelna Hospitality Consultancy

        This is an automated response. Please do not reply to this email.
      `
    }

    // Send both emails
    try {
      await Promise.all([
        transporter.sendMail(businessEmailOptions),
        transporter.sendMail(autoReplyOptions)
      ])

      logger.emailSent(envConfig.CONTACT_EMAIL, `New Contact Form Submission: ${sanitizedSubject}`, true)
      logger.emailSent(email, 'Thank you for contacting Hotelna', true)
      logger.formSubmission(clientIP, true)

    } catch (error) {
      logger.emailSent(envConfig.CONTACT_EMAIL, `New Contact Form Submission: ${sanitizedSubject}`, false, error instanceof Error ? error.message : 'Unknown error')
      logger.formSubmission(clientIP, false, error instanceof Error ? error.message : 'Unknown error')

      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      )
    }

    // Log successful submission
    const processingTime = Date.now() - startTime
    logger.info('Contact form submission successful', {
      ip: clientIP,
      processingTime,
      emailConfidence: emailValidation.confidence,
      spamConfidence: contentAnalysis.confidence
    })

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )

  } catch (error) {
    logger.error('Contact form submission failed', {
      ip: clientIP,
      error: error instanceof Error ? error.message : 'Unknown error',
      processingTime: Date.now() - startTime
    })

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
