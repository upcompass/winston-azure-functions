/* global context */
import winston = require('winston')

// Create the transport
export class AzureFunctions extends winston.Transport {
  context: any
  level: string
  name: string

  constructor(options) {
    super(options)
    this.name = 'azure-functions'
    this.context = options.context
    this.level = options.level || 'info'
  }

  log = (level, message, meta, callback) => {
    this.context.log[level](`[${level}] ${message}`)
    callback()
  }
}
