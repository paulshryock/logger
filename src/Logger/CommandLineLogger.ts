import { CommandLine } from '@paulshryock/abstractions'
import { LogContext } from '../Psr/Log/LogContext.ts'
import { Logger } from '../Psr/Log/Logger.ts'
import { LogLevel } from '../Psr/Log/LogLevel.ts'
import { NullLogger } from './NullLogger.ts'
import { Stringable } from '../Stringable.ts'

/**
 * Defines the command line method to use for each log level.
 *
 * @since unreleased
 */
export enum CommandLineMethod {
	/* eslint-disable @typescript-eslint/no-duplicate-enum-values -- Fine. */
	emergency = 'error',
	alert = 'error',
	critical = 'error',
	error = 'error',
	warning = 'error',
	notice = 'out',
	info = 'out',
	debug = 'out',
	/* eslint-enable @typescript-eslint/no-duplicate-enum-values */
}

/**
 * Describes a command line logger instance.
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
export class CommandLineLogger extends NullLogger implements Logger {
	#commandLine: CommandLine

	/**
	 * Constructs a command line logger.
	 *
	 * @param {CommandLine} commandLine Command line abstraction.
	 *
	 * @since unreleased
	 */
	public constructor(commandLine: CommandLine = new CommandLine()) {
		super()

		this.#commandLine = commandLine
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

		this.#commandLine[CommandLineMethod[level]](
			this.interpolate(message, context),
		)
	}
}
