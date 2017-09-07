/* global context */
import winston = require('winston')

export type LogLevel = 'error' | 'warn' | 'info' | 'verbose'

// Create the transport
export class AzureFunctions extends winston.Transport {
  context: any
  level: LogLevel
  name: string

  constructor(options) {
    super(options)
    this.name = 'azure-functions'
    this.context = options.context
    this.level = options.level || 'info'
  }

  log = (level, message, meta, callback) => {
    if (this.context.log[level]) {
      this.context.log[level](`[${level}] ${message}`)
    } else {
      this.context.log(`[${level}] ${message}`)
    }
    callback()
  }
}
