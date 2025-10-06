import { NextRequest } from 'next/server'

// Use Vercel KV for production rate limiting
const KV_REST_API_URL = process.env.KV_REST_API_URL
const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN

interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
  error?: string
}

interface RateLimitConfig {
  maxRequests: number
  windowMs: number
  keyGenerator?: (req: NextRequest) => string
}

// Default key generator using IP
const defaultKeyGenerator = (req: NextRequest): string => {
  const forwarded = req.headers.get('x-forwarded-for')
  const realIP = req.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0] || realIP || '127.0.0.1'
  return `rate_limit:${ip}`
}

// In-memory fallback for development/testing
const memoryStore = new Map<string, { count: number; resetTime: number }>()

// Cleanup memory store periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of memoryStore.entries()) {
    if (now > value.resetTime) {
      memoryStore.delete(key)
    }
  }
}, 60000) // Clean every minute

async function setKV(key: string, value: string, exSeconds: number): Promise<boolean> {
  if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
    return false
  }

  try {
    const response = await fetch(`${KV_REST_API_URL}/set/${key}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${KV_REST_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value, ex: exSeconds }),
    })
    return response.ok
  } catch {
    return false
  }
}

async function getKV(key: string): Promise<string | null> {
  if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
    return null
  }

  try {
    const response = await fetch(`${KV_REST_API_URL}/get/${key}`, {
      headers: {
        'Authorization': `Bearer ${KV_REST_API_TOKEN}`,
      },
    })

    if (!response.ok) return null

    const data = await response.json()
    return data.result
  } catch {
    return null
  }
}

async function incrKV(key: string): Promise<number | null> {
  if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
    return null
  }

  try {
    const response = await fetch(`${KV_REST_API_URL}/incr/${key}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${KV_REST_API_TOKEN}`,
      },
    })

    if (!response.ok) return null

    const data = await response.json()
    return data.result
  } catch {
    return null
  }
}

export async function rateLimit(
  req: NextRequest,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const { maxRequests, windowMs, keyGenerator = defaultKeyGenerator } = config
  const key = keyGenerator(req)
  const now = Date.now()
  const resetTime = now + windowMs

  try {
    // Try using Vercel KV first
    if (KV_REST_API_URL && KV_REST_API_TOKEN) {
      const currentCountStr = await getKV(key)
      const currentCount = currentCountStr ? parseInt(currentCountStr, 10) : 0

      if (currentCount === 0) {
        // First request in window
        await setKV(key, '1', Math.ceil(windowMs / 1000))
        return {
          success: true,
          limit: maxRequests,
          remaining: maxRequests - 1,
          reset: resetTime,
        }
      }

      if (currentCount >= maxRequests) {
        return {
          success: false,
          limit: maxRequests,
          remaining: 0,
          reset: resetTime,
        }
      }

      // Increment counter
      const newCount = await incrKV(key)
      const remaining = Math.max(0, maxRequests - (newCount || currentCount + 1))

      return {
        success: true,
        limit: maxRequests,
        remaining,
        reset: resetTime,
      }
    }

    // Fallback to in-memory store
    const existing = memoryStore.get(key)

    if (!existing || now > existing.resetTime) {
      memoryStore.set(key, { count: 1, resetTime })
      return {
        success: true,
        limit: maxRequests,
        remaining: maxRequests - 1,
        reset: resetTime,
      }
    }

    if (existing.count >= maxRequests) {
      return {
        success: false,
        limit: maxRequests,
        remaining: 0,
        reset: existing.resetTime,
      }
    }

    existing.count++
    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - existing.count,
      reset: existing.resetTime,
    }

  } catch (error) {
    console.error('Rate limiting error:', error)
    // On error, allow the request but log it
    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - 1,
      reset: resetTime,
      error: 'Rate limiting service unavailable',
    }
  }
}

// Specific rate limiters for different endpoints
export const contactFormRateLimit = (req: NextRequest) =>
  rateLimit(req, {
    maxRequests: 3,
    windowMs: 15 * 60 * 1000, // 15 minutes
  })

export const generalApiRateLimit = (req: NextRequest) =>
  rateLimit(req, {
    maxRequests: 100,
    windowMs: 15 * 60 * 1000, // 15 minutes
  })
