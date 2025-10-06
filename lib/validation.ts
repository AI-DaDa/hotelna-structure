import { z } from 'zod'

// Environment variables schema
export const envSchema = z.object({
  // Email configuration
  SMTP_HOST: z.string().min(1, 'SMTP_HOST is required'),
  SMTP_PORT: z.string().regex(/^\d+$/, 'SMTP_PORT must be a number').default('587'),
  SMTP_SECURE: z.string().optional().default('false'),
  SMTP_USER: z.string().email('SMTP_USER must be a valid email'),
  SMTP_PASS: z.string().min(1, 'SMTP_PASS is required'),
  SMTP_FROM_EMAIL: z.string().email('SMTP_FROM_EMAIL must be a valid email'),
  CONTACT_EMAIL: z.string().email('CONTACT_EMAIL must be a valid email'),

  // Optional: Vercel KV for rate limiting
  KV_REST_API_URL: z.string().url().optional(),
  KV_REST_API_TOKEN: z.string().optional(),

  // Optional: Email validation service
  EMAIL_VALIDATION_API_KEY: z.string().optional(),

  // Optional: Logging service
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
})

// Contact form data schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Name contains invalid characters'),

  email: z
    .string()
    .email('Please enter a valid email address')
    .max(254, 'Email address is too long'),

  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must not exceed 200 characters'),

  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must not exceed 2000 characters'),

  honeypot: z.string().max(0, 'Honeypot field must be empty'),

  timestamp: z.number().optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
export type EnvConfig = z.infer<typeof envSchema>

// Validate environment variables
export function validateEnv(): EnvConfig {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Environment validation failed:')
      error.issues.forEach((err) => {
        console.error(`  ${err.path.join('.')}: ${err.message}`)
      })
      throw new Error('Invalid environment configuration')
    }
    throw error
  }
}

// Input sanitization with enhanced security
export function sanitizeInput(input: string): string {
  return input
    .trim()
    // Remove script tags and their content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove all HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove javascript: protocol
    .replace(/javascript:/gi, '')
    // Remove event handlers
    .replace(/on\w+\s*=/gi, '')
    // Remove data: URLs
    .replace(/data:[^;]*;base64,[a-zA-Z0-9+/=]*/gi, '')
    // Remove null bytes
    .replace(/\x00/g, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim()
}

// Enhanced email validation patterns
export const suspiciousEmailPatterns = [
  /\b(temp|temporary|disposable|fake|spam|test)\b/i,
  /\b\d{10,}\b/, // Long number sequences
  /[+\-_.]{3,}/, // Multiple special characters in sequence
  /@.*\.(tk|ml|ga|cf)$/, // Common disposable domains
]

export function isEmailSuspicious(email: string): boolean {
  return suspiciousEmailPatterns.some(pattern => pattern.test(email))
}

// Content analysis for spam detection
export interface SpamAnalysis {
  isSpam: boolean
  confidence: number
  reasons: string[]
}

export function analyzeContent(content: string): SpamAnalysis {
  const reasons: string[] = []
  let spamScore = 0

  // Check for excessive repetition
  const words = content.toLowerCase().split(/\s+/)
  const wordCount = new Map<string, number>()

  words.forEach(word => {
    if (word.length > 3) {
      wordCount.set(word, (wordCount.get(word) || 0) + 1)
    }
  })

  const maxRepeats = Math.max(...Array.from(wordCount.values()))
  if (maxRepeats > 5) {
    spamScore += 0.3
    reasons.push('Excessive word repetition')
  }

  // Check capitalization ratio
  const capsRatio = (content.match(/[A-Z]/g) || []).length / content.length
  if (capsRatio > 0.5 && content.length > 20) {
    spamScore += 0.2
    reasons.push('Excessive capitalization')
  }

  // Check for URL patterns
  const urlMatches = content.match(/(https?:\/\/[^\s]+)/gi) || []
  if (urlMatches.length > 2) {
    spamScore += 0.4
    reasons.push('Multiple URLs detected')
  }

  // Check for spam keywords
  const spamKeywords = [
    'viagra', 'cialis', 'casino', 'lottery', 'winner', 'congratulations',
    'click here', 'buy now', 'limited time', 'act now', 'urgent', 'immediate',
    'free money', 'guaranteed', 'no risk', 'call now'
  ]

  const spamKeywordCount = spamKeywords.filter(keyword =>
    content.toLowerCase().includes(keyword)
  ).length

  if (spamKeywordCount > 0) {
    spamScore += spamKeywordCount * 0.2
    reasons.push(`Contains ${spamKeywordCount} spam keyword(s)`)
  }

  // Check for suspicious patterns
  const suspiciousPatterns = [
    /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, // Credit card patterns
    /\$\d+.*\$/g, // Multiple dollar amounts
    /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/g, // Phone number patterns (excessive)
  ]

  suspiciousPatterns.forEach((pattern, index) => {
    const matches = content.match(pattern) || []
    if (matches.length > 1) {
      spamScore += 0.3
      const patternNames = ['credit card numbers', 'dollar amounts', 'phone numbers']
      reasons.push(`Multiple ${patternNames[index]} detected`)
    }
  })

  return {
    isSpam: spamScore > 0.5,
    confidence: Math.min(spamScore, 1),
    reasons
  }
}
