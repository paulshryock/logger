import { Stringable } from '../../Stringable.ts'
import { InvalidArgumentException } from './InvalidArgumentException.ts'
import { LogLevel } from './LogLevel.ts'

/**
 * Describes a logger instance.
 *
 * The message MUST be a string or object implementing toString().
 *
 * The message MAY contain placeholders in the form: {foo} where foo
 * will be replaced by the context data in key "foo".
 *
 * The context array can contain arbitrary data, the only assumption that
 * can be made by implementors is that if an Exception instance is given
 * to produce a stack trace, it MUST be in a key named "exception".
 *
 * See https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md
 * for the full interface specification.
 */
export interface LoggerInterface {
    /**
     * System is unusable.
     *
     * @param  {string | Stringable} message
     * @param  {array}               context
     * @return {void}
     */
    emergency(message: string | Stringable, context: object): void

    /**
     * Action must be taken immediately.
     *
     * Example: Entire website down, database unavailable, etc. This should
     * trigger the SMS alerts and wake you up.
     *
     * @param  {string | Stringable} message
     * @param  {array}               context
     * @return {void}
     */
    alert(message: string | Stringable, context: object): void

    /**
     * Critical conditions.
     *
     * Example: Application component unavailable, unexpected exception.
     *
     * @param  {string | Stringable} message
     * @param  {array}               context
     * @return {void}
     */
    critical(message: string | Stringable, context: object): void

    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     *
     * @param  {string | Stringable} message
     * @param  {array}               context
     * @return {void}
     */
    error(message: string | Stringable, context: object): void

    /**
     * Exceptional occurrences that are not errors.
     *
     * Example: Use of deprecated APIs, poor use of an API, undesirable things
     * that are not necessarily wrong.
     *
     * @param  {string | Stringable} message
     * @param  {array}               context
     * @return {void}
     */
    warning(message: string | Stringable, context: object): void

    /**
     * Normal but significant events.
     *
     * @param  {string | Stringable} message
     * @param  {array}               context
     * @return {void}
     */
    notice(message: string | Stringable, context: object): void

    /**
     * Interesting events.
     *
     * Example: User logs in, SQL logs.
     *
     * @param  {string | Stringable} message
     * @param  {array}               context
     * @return {void}
     */
    info(message: string | Stringable, context: object): void

    /**
     * Detailed debug information.
     *
     * @param  {string | Stringable} message
     * @param  {array}               context
     * @return {void}
     */
    debug(message: string | Stringable, context: object): void

    /**
     * Logs with an arbitrary level.
     *
     * @param  {LogLevel}            level
     * @param  {string | Stringable} message
     * @param  {array}               context
     * @return {void}
     * @throws {InvalidArgumentException}
     */
    log(level: LogLevel, message: string | Stringable, context: object): void
}
