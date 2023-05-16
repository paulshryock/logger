import { Stringable } from '../../Stringable.ts'
import { LogContext } from './LogContext.ts'
import { LogLevel } from './LogLevel.ts'

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
 */
export interface Logger {
    /**
     * System is unusable.
     *
     * @param  {Stringable} message
     * @param  {LogContext} context
     * @return {void}
     */
    emergency(message: Stringable, context: LogContext): void

    /**
     * Action must be taken immediately.
     *
     * Example: Entire website down, database unavailable, etc. This should
     * trigger the SMS alerts and wake you up.
     *
     * @param  {Stringable} message
     * @param  {LogContext} context
     * @return {void}
     */
    alert(message: Stringable, context: LogContext): void

    /**
     * Critical conditions.
     *
     * Example: Application component unavailable, unexpected exception.
     *
     * @param  {Stringable} message
     * @param  {LogContext} context
     * @return {void}
     */
    critical(message: Stringable, context: LogContext): void

    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     *
     * @param  {Stringable} message
     * @param  {LogContext} context
     * @return {void}
     */
    error(message: Stringable, context: LogContext): void

    /**
     * Exceptional occurrences that are not errors.
     *
     * Example: Use of deprecated APIs, poor use of an API, undesirable things
     * that are not necessarily wrong.
     *
     * @param  {Stringable} message
     * @param  {LogContext} context
     * @return {void}
     */
    warning(message: Stringable, context: LogContext): void

    /**
     * Normal but significant events.
     *
     * @param  {Stringable} message
     * @param  {LogContext} context
     * @return {void}
     */
    notice(message: Stringable, context: LogContext): void

    /**
     * Interesting events.
     *
     * Example: User logs in, SQL logs.
     *
     * @param  {Stringable} message
     * @param  {LogContext} context
     * @return {void}
     */
    info(message: Stringable, context: LogContext): void

    /**
     * Detailed debug information.
     *
     * @param  {Stringable} message
     * @param  {LogContext} context
     * @return {void}
     */
    debug(message: Stringable, context: LogContext): void

    /**
     * Logs with an arbitrary level.
     *
     * @param  {LogLevel}   level
     * @param  {Stringable} message
     * @param  {LogContext} context
     * @return {void | never}
     * @throws {TypeError}
     */
    log(level: LogLevel, message: Stringable, context: LogContext): void | never
}
