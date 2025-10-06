type LogLevel = 'error' | 'warn' | 'info' | 'debug'

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  context?: Record<string, any>
  ip?: string
  userAgent?: string
}

class Logger {
  private logLevel: LogLevel

  constructor() {
    this.logLevel = (process.env.LOG_LEVEL as LogLevel) || 'info'
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3,
    }
    return levels[level] <= levels[this.logLevel]
  }

  private formatLog(entry: LogEntry): string {
    const { timestamp, level, message, context, ip, userAgent } = entry

    let logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`

    if (ip) {
      logMessage += ` | IP: ${ip}`
    }

    if (context && Object.keys(context).length > 0) {
      logMessage += ` | Context: ${JSON.stringify(context)}`
    }

    if (userAgent && this.logLevel === 'debug') {
      logMessage += ` | UA: ${userAgent}`
    }

    return logMessage
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>): void {
    if (!this.shouldLog(level)) return

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
    }

    const formattedLog = this.formatLog(entry)

    // In production, you might want to send this to a logging service
    // For now, we'll use console methods
    switch (level) {
      case 'error':
        console.error(formattedLog)
        break
      case 'warn':
        console.warn(formattedLog)
        break
      case 'info':
        console.info(formattedLog)
        break
      case 'debug':
        console.debug(formattedLog)
        break
    }
  }

  error(message: string, context?: Record<string, any>): void {
    this.log('error', message, context)
  }

  warn(message: string, context?: Record<string, any>): void {
    this.log('warn', message, context)
  }

  info(message: string, context?: Record<string, any>): void {
    this.log('info', message, context)
  }

  debug(message: string, context?: Record<string, any>): void {
    this.log('debug', message, context)
  }

  // Security-specific logging methods
  securityEvent(event: string, ip: string, details?: Record<string, any>): void {
    this.warn(`SECURITY: ${event}`, {
      ip,
      type: 'security_event',
      ...details
    })
  }

  rateLimitExceeded(ip: string, endpoint: string, attempts: number): void {
    this.warn(`Rate limit exceeded`, {
      ip,
      endpoint,
      attempts,
      type: 'rate_limit',
    })
  }

  spamDetected(ip: string, reason: string, content?: string): void {
    this.warn(`Spam detected`, {
      ip,
      reason,
      contentLength: content?.length || 0,
      type: 'spam_detection',
    })
  }

  formSubmission(ip: string, success: boolean, error?: string): void {
    const level = success ? 'info' : 'warn'
    this.log(level, `Contact form submission ${success ? 'successful' : 'failed'}`, {
      ip,
      success,
      error,
      type: 'form_submission',
    })
  }

  emailSent(to: string, subject: string, success: boolean, error?: string): void {
    const level = success ? 'info' : 'error'
    this.log(level, `Email ${success ? 'sent' : 'failed'}`, {
      to: to.replace(/(.{3}).*(@.*)/, '$1***$2'), // Partially mask email
      subject,
      success,
      error,
      type: 'email',
    })
  }
}

export const logger = new Logger()