import { describe, expect, it } from '@jest/globals'
import { FileSystemLogger } from '../../../src/Logger/FileSystemLogger.ts'
import { LocalFileSystem } from '@paulshryock/abstractions'
import { LogLevel } from '../../../src/Psr/Log/LogLevel.ts'

it('should throw when instantiating a file system logger directly', () => {
	// @ts-expect-error -- Private constructor called directly, with no argument.
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return -- 👍.
	expect(() => new FileSystemLogger()).toThrow(TypeError)
})

it('should instantiate from a path and log a message', async () => {
	const logger = await FileSystemLogger.fromPath('/dev/null')

	logger.log(LogLevel.DEBUG, 'some message', {})

	expect(logger).toBeInstanceOf(FileSystemLogger)
})

describe('when log level is not valid', () => {
	const logLevel = 'invalid'

	it('should throw a type error', async () => {
		const logger = await FileSystemLogger.fromPath(
			'tests/unit/.temp/path/to/file',
		)

		// @ts-expect-error -- Log level is invalid.
		expect(() => logger.log(logLevel, 'some message')).toThrow(TypeError)

		const fileSystem = new LocalFileSystem()

		if (await fileSystem.exists('tests/unit/.temp'))
			await fileSystem.deleteDirectory('tests/unit/.temp')
	})
})
