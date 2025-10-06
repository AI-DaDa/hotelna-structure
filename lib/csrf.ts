import { NextRequest } from 'next/server'
import { createHash, randomBytes } from 'crypto'

// CSRF token configuration
const TOKEN_LENGTH = 32
const TOKEN_EXPIRY = 60 * 60 * 1000 // 1 hour in milliseconds

interface CSRFTokenData {
  token: string
  expiry: number
  ip: string
}

// In-memory store for CSRF tokens (use Redis in production)
const tokenStore = new Map<string, CSRFTokenData>()

// Clean up expired tokens periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, data] of tokenStore.entries()) {
    if (now > data.expiry) {
      tokenStore.delete(key)
    }
  }
}, 5 * 60 * 1000) // Clean every 5 minutes

// Generate a secure random token
function generateToken(): string {
  return randomBytes(TOKEN_LENGTH).toString('hex')
}

// Get client identifier for token binding
function getClientIdentifier(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const realIP = req.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0] || realIP || '127.0.0.1'
  const userAgent = req.headers.get('user-agent') || ''

  // Create a hash of IP + User Agent for additional security
  return createHash('sha256')
    .update(`${ip}:${userAgent}`)
    .digest('hex')
    .substring(0, 16)
}

// Generate CSRF token
export function generateCSRFToken(req: NextRequest): string {
  const token = generateToken()
  const clientId = getClientIdentifier(req)
  const expiry = Date.now() + TOKEN_EXPIRY

  const forwarded = req.headers.get('x-forwarded-for')
  const realIP = req.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0] || realIP || '127.0.0.1'

  tokenStore.set(token, {
    token,
    expiry,
    ip: clientId, // Store hashed client identifier
  })

  return token
}

// Validate CSRF token
export function validateCSRFToken(req: NextRequest, token: string): boolean {
  if (!token || typeof token !== 'string') {
    return false
  }

  const tokenData = tokenStore.get(token)

  if (!tokenData) {
    return false
  }

  // Check if token has expired
  if (Date.now() > tokenData.expiry) {
    tokenStore.delete(token)
    return false
  }

  // Verify client identifier matches
  const currentClientId = getClientIdentifier(req)
  if (tokenData.ip !== currentClientId) {
    return false
  }

  // Token is valid - remove it (one-time use)
  tokenStore.delete(token)
  return true
}

// Get CSRF token from request headers or body
export function extractCSRFToken(req: NextRequest, body?: any): string | null {
  // Try to get from headers first
  let token = req.headers.get('x-csrf-token')

  if (!token && body && typeof body === 'object') {
    // Try to get from request body
    token = body.csrfToken || body._token
  }

  return token
}

// Middleware helper for CSRF protection
export function requireCSRFToken(req: NextRequest, body?: any): { valid: boolean; error?: string } {
  // Skip CSRF for GET, HEAD, OPTIONS requests
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return { valid: true }
  }

  const token = extractCSRFToken(req, body)

  if (!token) {
    return {
      valid: false,
      error: 'CSRF token is required'
    }
  }

  if (!validateCSRFToken(req, token)) {
    return {
      valid: false,
      error: 'Invalid or expired CSRF token'
    }
  }

  return { valid: true }
}