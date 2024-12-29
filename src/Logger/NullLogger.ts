import { LogContext } from '../Psr/Log/LogContext.ts'
import { Logger } from '../Psr/Log/Logger.ts'
import { LogLevel } from '../Psr/Log/LogLevel.ts'
import { Stringable } from '../Stringable.ts'

/**
 * Describes a null logger instance.
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
export abstract class NullLogger implements Logger {
	/**
	 * System is unusable.
	 *
	 * @param  {Stringable} message Message to log.
	 * @param  {LogContext} context Logging context for the logged message.
	 * @return {void}
	 *
	 * @since  unreleased
	 */
	public emergency(message: Stringable, context: LogContext = {}): void {
		this.log(LogLevel.EMERGENCY, message, context)
	}

	/**
	 * Action must be taken immediately.
	 *
	 * Example: Entire website down, database unavailable, etc. This should
	 * trigger the SMS alerts and wake you up.
	 *
	 * @param  {Stringable} message Message to log.
	 * @param  {LogContext} context Logging context for the logged message.
	 * @return {void}
	 *
	 * @since  unreleased
	 */
	public alert(message: Stringable, context: LogContext = {}): void {
		this.log(LogLevel.ALERT, message, context)
	}

	/**
	 * Critical conditions.
	 *
	 * Example: Application component unavailable, unexpected exception.
	 *
	 * @param  {Stringable} message Message to log.
	 * @param  {LogContext} context Logging context for the logged message.
	 * @return {void}
	 *
	 * @since  unreleased
	 */
	public critical(message: Stringable, context: LogContext = {}): void {
		this.log(LogLevel.CRITICAL, message, context)
	}

	/**
	 * Runtime errors that do not require immediate action but should typically
	 * be logged and monitored.
	 *
	 * @param  {Stringable} message Message to log.
	 * @param  {LogContext} context Logging context for the logged message.
	 * @return {void}
	 *
	 * @since  unreleased
	 */
	public error(message: Stringable, context: LogContext = {}): void {
		this.log(LogLevel.ERROR, message, context)
	}

	/**
	 * Exceptional occurrences that are not errors.
	 *
	 * Example: Use of deprecated APIs, poor use of an API, undesirable things
	 * that are not necessarily wrong.
	 *
	 * @param  {Stringable} message Message to log.
	 * @param  {LogContext} context Logging context for the logged message.
	 * @return {void}
	 *
	 * @since  unreleased
	 */
	public warning(message: Stringable, context: LogContext = {}): void {
		this.log(LogLevel.WARNING, message, context)
	}

	/**
	 * Normal but significant events.
	 *
	 * @param  {Stringable} message Message to log.
	 * @param  {LogContext} context Logging context for the logged message.
	 * @return {void}
	 *
	 * @since  unreleased
	 */
	public notice(message: Stringable, context: LogContext = {}): void {
		this.log(LogLevel.NOTICE, message, context)
	}

	/**
	 * Interesting events.
	 *
	 * Example: User logs in, SQL logs.
	 *
	 * @param  {Stringable} message Message to log.
	 * @param  {LogContext} context Logging context for the logged message.
	 * @return {void}
	 *
	 * @since  unreleased
	 */
	public info(message: Stringable, context: LogContext = {}): void {
		this.log(LogLevel.INFO, message, context)
	}

	/**
	 * Detailed debug information.
	 *
	 * @param  {Stringable} message Message to log.
	 * @param  {LogContext} context Logging context for the logged message.
	 * @return {void}
	 *
	 * @since  unreleased
	 */
	public debug(message: Stringable, context: LogContext = {}): void {
		this.log(LogLevel.DEBUG, message, context)
	}

	/**
	 * Logs with an arbitrary level.
	 *
	 * @param  {LogLevel}   level   Logging level.
	 * @param  {Stringable} message Message to log.
	 * @param  {LogContext} context Logging context for the logged message.
	 * @return {void}
	 * @throws {TypeError}
	 *
	 * @since  unreleased
	 */
	public abstract log(
		level: LogLevel,
		message: Stringable,
		context: LogContext,
	): void

	/**
	 * Interpolates some logging context into a log message.
	 *
	 * @param  {Stringable} message Message to log.
	 * @param  {LogContext} context Logging context for the logged message.
	 * @return {string}             Interpolated message.
	 *
	 * @since  unreleased
	 */
	protected interpolate(message: Stringable, context: LogContext): string {
		return Object.entries(context).reduce(
			(interpolated, [key, value]): string =>
				interpolated.includes(`{${key}}`)
					? interpolated.replaceAll(`{${key}}`, `${value}`)
					: interpolated,
			`${message}`,
		)
	}
}
