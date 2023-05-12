import { Console } from 'node:console'
import { ConsoleLogger } from '../../src/Logger/ConsoleLogger.ts'
import { describe, expect, it, jest, test } from '@jest/globals'
import { InvalidArgumentException } from '../../src/Psr/Log/InvalidArgumentException.ts'
import { ConsoleMethod } from '../../src/Logger/ConsoleLogger/ConsoleMethod.ts'
import { LogLevel } from '../../src/Psr/Log/LogLevel.ts'
import { Writable } from 'node:stream'

class MockConsole extends Console {
  error = jest.fn()
  warn = jest.fn()
  log = jest.fn()
  info = jest.fn()
  debug = jest.fn()
}

describe('ConsoleLogger', () => {
  const consoleMock = new MockConsole({
    stderr: new Writable({}),
    stdout: new Writable({}),
  })

  it('should instantiate', () => {
    expect(() => new ConsoleLogger()).not.toThrow()
  })

  it('should throw if the level is invalid', () => {
    expect(() => new ConsoleLogger(consoleMock)
      // @ts-expect-error calling invalid method to throw error
      .log('invalid', 'an invalid message'))
        .toThrow(InvalidArgumentException)
  })

  describe.each(Object.entries(LogLevel))(
    'should log a message to the console',
    (logLevel: LogLevel) => {
      test(logLevel, () => {
        const logger = new ConsoleLogger(consoleMock)
        logger[`${logLevel.toLowerCase()}`](`a ${logLevel} message`)

        expect(consoleMock[ConsoleMethod[logLevel]]).toHaveBeenCalled()
      })
    },
  )
})
