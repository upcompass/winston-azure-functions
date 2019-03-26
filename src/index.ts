import { LogEntry } from 'winston'
import TransportStream, { TransportStreamOptions } from 'winston-transport'

/**
 * Azure Functions supported log levels.
 * @type { 'error' | 'warn' | 'info' | 'verbose' }
 */
export type AzureFunctionsLogLevel = 'error' | 'warn' | 'info' | 'verbose'

/**
 * Options object interface for AzureFunctions transport stream constructor.
 * @interface
 * @extends {TransportStreamOptions}
 * @property {object} context - An Azure Function context object.
 * @property {AzureFunctionsLogLevel} [level] - Specifies the maximum severity
 *   level of messages that the transport should log.
 */
export interface AzureFunctionsStreamOptions extends TransportStreamOptions {
  context: any
  level?: AzureFunctionsLogLevel
}

/**
 * Transport for outputting to Azure Function's `context.log`.
 * @type {AzureFunctions}
 * @extends {TransportStream}
 */
export class AzureFunctions extends TransportStream {
  /**
   * An Azure Function context object.
   * @member {Object}
   */
  context: any

  /**
   * Specifies the maximum severity level of messages that the transport should
   * log.
   * @member {AzureFunctionsLogLevel}
   */
  level: AzureFunctionsLogLevel

  /**
   * The name of the TransportStream.
   * @member {string}
   */
  name: string

  /**
   * Constructor function for the AzureFunctions transport object responsible
   * for sending log messages to Azure Function's context.log object.
   * @constructor
   * @param {AzureFunctionsStreamOptions}
   */
  constructor(options: AzureFunctionsStreamOptions) {
    super(options)
    this.name = 'azure-functions'
    this.context = options.context
    this.level = options.level || 'info'
  }

  /**
   * Core logging method exposed to Winston.
   * @param {LogEntry} info - LogEntry object containing level and message.
   * @param {Function} callback - TODO: add param description.
   * @returns {undefined}
   */
  log = ({ level, message }: LogEntry, callback: () => void) => {
    if (this.context.log[level]) {
      this.context.log[level](message)
    } else {
      this.context.log(`[${level}]`, message)
    }
    callback()
  }
}
