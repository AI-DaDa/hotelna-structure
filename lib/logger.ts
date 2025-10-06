type LogLevel = 'error' | 'warn' | 'info' | 'debug'

interface LogEntry {
  level: LogLevel
  message: string
  data?: Record<string, unknown>
  timestamp: string
  context?: string
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
    const { timestamp, level, message, context } = entry

    let logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`

    if (context && Object.keys(context).length > 0) {
      logMessage += ` | Context: ${JSON.stringify(context)}`
    }

    return logMessage
  }

  private log(level: LogLevel, message: string, data?: Record<string, unknown>): void {
    if (!this.shouldLog(level)) return

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: data ? JSON.stringify(data) : undefined,
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

  error(message: string, error?: Error | Record<string, unknown> | string): void {
    this.log('error', message, {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
    })
  }

  warn(message: string, data?: Record<string, unknown>): void {
    this.log('warn', message, data)
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.log('info', message, context)
  }

  debug(message: string, data?: Record<string, unknown>): void {
    this.log('debug', message, data)
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