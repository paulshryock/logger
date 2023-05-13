import { Console } from 'node:console'
import { ConsoleLogger } from '../../../src/Logger/ConsoleLogger/ConsoleLogger.ts'
import { describe, expect, it, jest, test } from '@jest/globals'
import { ConsoleMethod } from '../../../src/Logger/ConsoleLogger/ConsoleMethod.ts'
import { LogLevel } from '../../../src/Psr/Log/LogLevel.ts'
import { Writable } from 'node:stream'

class MockConsole extends Console {
  override error = jest.fn()
  override warn = jest.fn()
  override log = jest.fn()
  override info = jest.fn()
  override debug = jest.fn()
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
        .toThrow(TypeError)
  })

  describe.each(Object.entries(LogLevel))(
    'should log a message to the console',
    (testCase, level: LogLevel) => {
      test(testCase, () => {
        new ConsoleLogger(consoleMock)[`${level}`](`a ${level} message`)

        expect(
          consoleMock[
            ConsoleMethod[
              testCase as keyof typeof ConsoleMethod
            ] as keyof typeof consoleMock
          ],
        ).toHaveBeenCalled()
      })
    },
  )
})
