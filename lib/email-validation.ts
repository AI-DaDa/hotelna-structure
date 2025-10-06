import { logger } from './logger'

interface EmailValidationResult {
  isValid: boolean
  isDisposable: boolean
  isFreeEmail: boolean
  confidence: number
  provider?: string
  reason?: string
}

// Common disposable email domains
const disposableDomains = new Set([
  '10minutemail.com', 'guerrillamail.com', 'mailinator.com', 'tempmail.org',
  'throwaway.email', 'temp-mail.org', 'yopmail.com', 'maildrop.cc',
  'sharklasers.com', 'grr.la', 'guerrillamailblock.com', 'pokemail.net',
  'spam4.me', 'bccto.me', 'mytrashmail.com', 'emailtemporanea.net',
  'wegwerfmail.de', 'trashmail.net', 'trashemail.net', 'tempmail.email',
  'getnada.com', 'rhyta.com', 'emailondeck.com', 'fakemailgenerator.com'
])

// Free email providers (not necessarily bad, but worth noting)
const freeEmailProviders = new Set([
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
  'icloud.com', 'protonmail.com', 'zoho.com', 'mail.com', 'yandex.com'
])

// Basic email validation regex (more permissive than RFC 5322 but practical)
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

// Advanced email validation using external service
async function validateEmailWithService(email: string): Promise<EmailValidationResult | null> {
  const apiKey = process.env.EMAIL_VALIDATION_API_KEY

  if (!apiKey) {
    logger.debug('Email validation API key not configured')
    return null
  }

  try {
    // Example using Abstract API (you can replace with your preferred service)
    const response = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(email)}`)

    if (!response.ok) {
      logger.warn('Email validation service error', {
        status: response.status,
        statusText: response.statusText
      })
      return null
    }

    const data = await response.json()

    return {
      isValid: data.deliverability === 'DELIVERABLE',
      isDisposable: data.is_disposable_email?.value || false,
      isFreeEmail: data.is_free_email?.value || false,
      confidence: data.quality_score || 0.5,
      provider: data.autocorrect || undefined,
      reason: data.deliverability
    }
  } catch (error) {
    logger.error('Email validation service failed', { error: error instanceof Error ? error.message : 'Unknown error' })
    return null
  }
}

// Local email validation
function validateEmailLocally(email: string): EmailValidationResult {
  // Basic format validation
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      isDisposable: false,
      isFreeEmail: false,
      confidence: 0,
      reason: 'Invalid email format'
    }
  }

  // Extract domain
  const domain = email.split('@')[1]?.toLowerCase()

  if (!domain) {
    return {
      isValid: false,
      isDisposable: false,
      isFreeEmail: false,
      confidence: 0,
      reason: 'No domain found'
    }
  }

  // Check if disposable
  const isDisposable = disposableDomains.has(domain)

  // Check if free email
  const isFreeEmail = freeEmailProviders.has(domain)

  // Additional suspicious patterns
  const suspiciousPatterns = [
    /\+.*@/, // Plus addressing (not inherently bad, but can be used for spam)
    /\d{5,}/, // Long number sequences
    /[._-]{3,}/, // Multiple consecutive special characters
    /@.*\.tk$|@.*\.ml$|@.*\.ga$|@.*\.cf$/, // Suspicious TLDs
  ]

  const hasSuspiciousPattern = suspiciousPatterns.some(pattern => pattern.test(email))

  // Calculate confidence score
  let confidence = 0.8 // Base confidence for valid format

  if (isDisposable) confidence -= 0.6
  if (hasSuspiciousPattern) confidence -= 0.3
  if (isFreeEmail) confidence -= 0.1 // Free emails are common and mostly legitimate

  // Domain checks
  if (domain.length < 4) confidence -= 0.2 // Very short domains are suspicious
  if (!domain.includes('.')) confidence -= 0.8 // Must have TLD

  return {
    isValid: confidence > 0.3,
    isDisposable,
    isFreeEmail,
    confidence: Math.max(0, Math.min(1, confidence)),
    reason: confidence <= 0.3 ? 'Low confidence score' : undefined
  }
}

// Main email validation function
export async function validateEmail(email: string): Promise<EmailValidationResult> {
  // First, try local validation
  const localResult = validateEmailLocally(email)

  // If local validation fails, return early
  if (!localResult.isValid) {
    logger.debug('Email failed local validation', { email: email.replace(/(.{3}).*(@.*)/, '$1***$2'), reason: localResult.reason })
    return localResult
  }

  // Try external validation service if available
  const serviceResult = await validateEmailWithService(email)

  if (serviceResult) {
    logger.debug('Email validation service result', {
      email: email.replace(/(.{3}).*(@.*)/, '$1***$2'),
      isValid: serviceResult.isValid,
      confidence: serviceResult.confidence
    })
    return serviceResult
  }

  // Fall back to local result
  logger.debug('Using local email validation result', {
    email: email.replace(/(.{3}).*(@.*)/, '$1***$2'),
    confidence: localResult.confidence
  })

  return localResult
}

// Check if email should be blocked
export function shouldBlockEmail(validationResult: EmailValidationResult): boolean {
  return (
    !validationResult.isValid ||
    validationResult.isDisposable ||
    validationResult.confidence < 0.4
  )
}

// Get user-friendly error message
export function getEmailErrorMessage(validationResult: EmailValidationResult): string {
  if (!validationResult.isValid) {
    return 'Please enter a valid email address.'
  }

  if (validationResult.isDisposable) {
    return 'Temporary or disposable email addresses are not allowed. Please use a permanent email address.'
  }

  if (validationResult.confidence < 0.4) {
    return 'This email address appears to be invalid or suspicious. Please double-check and try again.'
  }

  return 'Please enter a valid email address.'
}