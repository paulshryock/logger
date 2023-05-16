import { Console } from 'node:console'
import {
  ConsoleLogger,
} from '../../../src/Logger/ConsoleLogger/ConsoleLogger.ts'
import { describe, expect, it, jest, test } from '@jest/globals'
import {
  ConsoleMethod,
} from '../../../src/Logger/ConsoleLogger/ConsoleMethod.ts'
import { LogLevel } from '../../../src/Psr/Log/LogLevel.ts'
import { Stringable } from '../../../src/Stringable.ts'
import { Writable } from 'node:stream'

class MockConsole extends Console {
  override error = jest.fn()
  override warn = jest.fn()
  override log = jest.fn()
  override info = jest.fn()
  override debug = jest.fn()
}

class MockStringable implements Stringable {
  constructor(public readonly message: string) {}

  toString(): string {
    return this.message
  }
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

  it('should accept a stringable message', () => {
    const message = 'hello world'
    const stringableMessage = new MockStringable('hello world')

    new ConsoleLogger(consoleMock).debug(stringableMessage)

    expect(consoleMock.debug).toHaveBeenCalledWith(message)
  })

  it('should include context in the logged message', () => {
    const message = 'hello world'
    const context = { hello: 'world' }

    new ConsoleLogger(consoleMock).debug(message, context)

    expect(consoleMock.debug).toHaveBeenCalledWith(message, context)
  })

  it('should interpolate the message from context', () => {
    const message = 'hello {location}'
    const context = { location: 'world' }
    const expected = 'hello world'

    new ConsoleLogger(consoleMock).debug(message, context)

    expect(consoleMock.debug).toHaveBeenCalledWith(expected, context)
  })
})
