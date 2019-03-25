import * as winston from 'winston'

import { AzureFunctions, AzureFunctionsLogLevel } from '../src'

// creates a mock context for use in testing
const context = {
  log: jest.fn().mockImplementation(() => {
    const log = jest.fn() as any
    log.info = jest.fn()
    log.error = jest.fn()
    log.verbose = jest.fn()
    log.warn = jest.fn()
    return log
  })()
}

afterEach(() => {
  jest.resetAllMocks()
})

describe('supported log levels', () => {
  test.each([
    ['error', 'error level message'],
    ['warn', 'warn level message'],
    ['info', 'info level message'],
    ['verbose', 'verbose level message']
  ])('winston.%s(%s)', (level: AzureFunctionsLogLevel, message: string) => {
    winston.add(new AzureFunctions({ context, level }))

    jest.spyOn(context.log, level)

    winston[level](message)
    expect(context.log[level]).toHaveBeenCalledWith(message)

    winston.log({ level, message })
    expect(context.log[level]).toHaveBeenCalledWith(message)
  })
})

describe('unsupport log levels', () => {
  // improperly casts level as AzureFunctionsLogLevel to test unsupported log
  // levels.
  test.each([
    ['debug', 'debug level message'],
    ['silly', 'silly level message']
  ])('winston.%s(%s)', (level: AzureFunctionsLogLevel, message: string) => {
    winston.add(new AzureFunctions({ context, level }))

    jest.spyOn(context, 'log')

    winston[level](message)
    expect(context.log).toHaveBeenCalledWith(`[${level}]`, message)

    winston.log({ level, message })
    expect(context.log).toHaveBeenCalledWith(`[${level}]`, message)
  })
})
