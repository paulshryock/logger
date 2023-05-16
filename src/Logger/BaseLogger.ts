import { Logger } from '../Psr/Log/Logger.ts'
import { LogContext } from '../Psr/Log/LogContext.ts'
import { LogLevel } from '../Psr/Log/LogLevel.ts'
import { Stringable } from '../Stringable.ts'

export class BaseLogger implements Logger {
    /**
     * System is unusable.
     *
     * @param  {Stringable} message
     * @param  {LogContext} context
     * @return {void}
     */
    emergency(message: Stringable, context: LogContext = {}): void {
        this.log(LogLevel.EMERGENCY, message, context)
    }

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
    alert(message: Stringable, context: LogContext = {}): void {
        this.log(LogLevel.ALERT, message, context)
    }

    /**
     * Critical conditions.
     *
     * Example: Application component unavailable, unexpected exception.
     *
     * @param  {Stringable} message
     * @param  {LogContext} context
     * @return {void}
     */
    critical(message: Stringable, context: LogContext = {}): void {
        this.log(LogLevel.CRITICAL, message, context)
    }

    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     *
     * @param  {Stringable} message
     * @param  {LogContext} context
     * @return {void}
     */
    error(message: Stringable, context: LogContext = {}): void {
        this.log(LogLevel.ERROR, message, context)
    }

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
    warning(message: Stringable, context: LogContext = {}): void {
        this.log(LogLevel.WARNING, message, context)
    }

    /**
     * Normal but significant events.
     *
     * @param  {Stringable} message
     * @param  {LogContext} context
     * @return {void}
     */
    notice(message: Stringable, context: LogContext = {}): void {
        this.log(LogLevel.NOTICE, message, context)
    }

    /**
     * Interesting events.
     *
     * Example: User logs in, SQL logs.
     *
     * @param  {Stringable} message
     * @param  {LogContext} context
     * @return {void}
     */
    info(message: Stringable, context: LogContext = {}): void {
        this.log(LogLevel.INFO, message, context)
    }

    /**
     * Detailed debug information.
     *
     * @param  {Stringable} message
     * @param  {LogContext} context
     * @return {void}
     */
    debug(message: Stringable, context: LogContext = {}): void {
        this.log(LogLevel.DEBUG, message, context)
    }

    /**
     * Logs with an arbitrary level.
     *
     * @param  {LogLevel}   level
     * @param  {Stringable} message
     * @param  {LogContext} context
     * @return {void | never}
     * @throws {TypeError}
     */
    log(
        // @ts-expect-error base class has empty implementation
        level: LogLevel,
        // @ts-expect-error base class has empty implementation
        message: Stringable,
        // @ts-expect-error base class has empty implementation
        context: LogContext = {},
    ): void | never {}

    /**
     * Interpolates a message from context.
     *
     * @since  unreleased
     *
     * @param  {Stringable} message
     * @param  {LogContext} context
     * @return {string}
     */
    protected interpolate(
        message: Stringable,
        context: LogContext = {},
    ): string {
        return Object.entries(context)
            .reduce((interpolated, [key, value]): string => {
                if (!interpolated.includes(`{${key}}`))
                    return interpolated

                return interpolated.replaceAll(`{${key}}`, value)
            }, message.toString())
    }
}
