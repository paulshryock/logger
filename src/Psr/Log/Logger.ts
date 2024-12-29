import { LogContext } from './LogContext.ts'
import { LogLevel } from './LogLevel.ts'
import { Stringable } from '../../Stringable.ts'

/**
 * Describes a logger instance.
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
export interface Logger {
	/**
	 * System is unusable.
	 *
	 * @param  {Stringable} message Message to log.
	 * @param  {LogContext} context Logging context for the logged message.
	 * @return {void}
	 *
	 * @since  unreleased
	 */
	emergency(message: Stringable, context: LogContext): void

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
	alert(message: Stringable, context: LogContext): void

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
	critical(message: Stringable, context: LogContext): void

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
	error(message: Stringable, context: LogContext): void

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
	warning(message: Stringable, context: LogContext): void

	/**
	 * Normal but significant events.
	 *
	 * @param  {Stringable} message Message to log.
	 * @param  {LogContext} context Logging context for the logged message.
	 * @return {void}
	 *
	 * @since  unreleased
	 */
	notice(message: Stringable, context: LogContext): void

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
	info(message: Stringable, context: LogContext): void

	/**
	 * Detailed debug information.
	 *
	 * @param  {Stringable} message Message to log.
	 * @param  {LogContext} context Logging context for the logged message.
	 * @return {void}
	 *
	 * @since  unreleased
	 */
	debug(message: Stringable, context: LogContext): void

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
	log(level: LogLevel, message: Stringable, context: LogContext): void
}
