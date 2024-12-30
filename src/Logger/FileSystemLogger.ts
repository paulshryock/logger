import { createReadStream, createWriteStream } from 'node:fs'
import {
	LocalFileSystem,
	CommandLine as StreamConnector,
} from '@paulshryock/abstractions'
import { LogContext } from '../Psr/Log/LogContext.ts'
import { Logger } from '../Psr/Log/Logger.ts'
import { LogLevel } from '../Psr/Log/LogLevel.ts'
import { NullLogger } from './NullLogger.ts'
import { Stringable } from '../Stringable.ts'

/**
 * Describes a file system logger instance.
 *
 * The message MUST be a string or object implementing toString().
 *
 * The message MAY contain placeholders in the form: {foo} where foo
 * will be replaced by the context data in key "foo".
 *
 * The context object can contain arbitrary data, the only assumption that
 * can be made by implementors is that if an Error instance is given
 * to produce a stack trace, it MUST be in a key named "exception".
 *
 * See https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md
 * for the full interface specification.
 *
 * @since unreleased
 */
export class FileSystemLogger extends NullLogger implements Logger {
	#fileSystem: StreamConnector

	/**
	 * Constructs a file system logger.
	 *
	 * @param {StreamConnector} fileSystem File system stream connector.
	 * @throws {TypeError}                  FileSystem is not a StreamConnector.
	 *
	 * @since unreleased
	 */
	private constructor(fileSystem: StreamConnector) {
		super()

		if (!(fileSystem instanceof StreamConnector))
			throw new TypeError(
				'Instantiate using static builder: FileSystemLogger.fromPath(path).',
			)

		this.#fileSystem = fileSystem
	}

	/**
	 * Builds a file system logger from a given path, creating the file if it
	 * does not already exist.
	 *
	 * @param  {string}                    path Path to log file.
	 * @return {Promise<FileSystemLogger>}      Built file system logger.
	 *
	 * @since  unreleased
	 */
	public static async fromPath(path: string): Promise<FileSystemLogger> {
		const fileSystem = new LocalFileSystem()

		if (!(await fileSystem.exists(path))) await fileSystem.writeFile(path, '')

		const input = createReadStream(path)
		const output = createWriteStream(path, { flags: 'a' })

		const streams = {
			stderr: output,
			stdin: input,
			stdout: output,
		}

		return new FileSystemLogger(new StreamConnector(streams))
	}

	/**
	 * Logs with an arbitrary level.
	 *
	 * @param  {LogLevel}   level   Logging level.
	 * @param  {Stringable} message Message to log.
	 * @param  {LogContext} context Logging context for the logged message.
	 * @return {void}
	 * @throws {TypeError}          Level is invalid.
	 *
	 * @since  unreleased
	 */
	public log(
		level: LogLevel,
		message: Stringable,
		context: LogContext = {},
	): void {
		this.validateLevel(level)

		this.#fileSystem.out(this.interpolate(message, context))
	}
}
