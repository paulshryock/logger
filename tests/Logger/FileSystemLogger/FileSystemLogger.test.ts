import { describe, expect, it } from '@jest/globals'
import { FileSystemLogger } from '../../../src/Logger/FileSystemLogger/FileSystemLogger.ts'

describe('FileSystemLogger', () => {
  it('should instantiate', () => {
    expect(() => new FileSystemLogger()).not.toThrow()
  })

  it('should throw if the level is invalid', () => {
    expect(() => new FileSystemLogger()
      // @ts-expect-error calling invalid method to throw error
      .log('invalid', 'an invalid message'))
        .toThrow(TypeError)
  })

  it.todo('should log a message to the file system')
  it.todo('should should not overwrite an existing file')
  it.todo('should append messages to an existing file')
  it.todo('should allow different levels to log to different files')
  it.todo('should accept a stringable message')
  it.todo('should include context in the logged message')
  it.todo('should interpolate the message from context')
  it.todo('should format the logged message')
})
