import { Console } from 'node:console'
import { ConsoleMethod } from './ConsoleMethod.ts'
import { LoggerInterface } from '../../Psr/Log/LoggerInterface.ts'
import { LogLevel } from '../../Psr/Log/LogLevel.ts'
import { stderr, stdout } from 'node:process'
import { Stringable } from '../../Stringable.ts'

export class ConsoleLogger implements LoggerInterface {
    constructor(private console: Console = new Console({ stderr, stdout })) {}

    /**
     * System is unusable.
     *
     * @param  {Stringable} message
     * @param  {array}      context
     * @return {void}
     */
    emergency(message: Stringable, context: object = {}): void {
        this.log(LogLevel.EMERGENCY, message, context)
    }

    /**
     * Action must be taken immediately.
     *
     * Example: Entire website down, database unavailable, etc. This should
     * trigger the SMS alerts and wake you up.
     *
     * @param  {Stringable} message
     * @param  {array}      context
     * @return {void}
     */
    alert(message: Stringable, context: object = {}): void {
        this.log(LogLevel.ALERT, message, context)
    }

    /**
     * Critical conditions.
     *
     * Example: Application component unavailable, unexpected exception.
     *
     * @param  {Stringable} message
     * @param  {array}      context
     * @return {void}
     */
    critical(message: Stringable, context: object = {}): void {
        this.log(LogLevel.CRITICAL, message, context)
    }

    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     *
     * @param  {Stringable} message
     * @param  {array}      context
     * @return {void}
     */
    error(message: Stringable, context: object = {}): void {
        this.log(LogLevel.ERROR, message, context)
    }

    /**
     * Exceptional occurrences that are not errors.
     *
     * Example: Use of deprecated APIs, poor use of an API, undesirable things
     * that are not necessarily wrong.
     *
     * @param  {Stringable} message
     * @param  {array}      context
     * @return {void}
     */
    warning(message: Stringable, context: object = {}): void {
        this.log(LogLevel.WARNING, message, context)
    }

    /**
     * Normal but significant events.
     *
     * @param  {Stringable} message
     * @param  {array}      context
     * @return {void}
     */
    notice(message: Stringable, context: object = {}): void {
        this.log(LogLevel.NOTICE, message, context)
    }

    /**
     * Interesting events.
     *
     * Example: User logs in, SQL logs.
     *
     * @param  {Stringable} message
     * @param  {array}      context
     * @return {void}
     */
    info(message: Stringable, context: object = {}): void {
        this.log(LogLevel.INFO, message, context)
    }

    /**
     * Detailed debug information.
     *
     * @param  {Stringable} message
     * @param  {array}      context
     * @return {void}
     */
    debug(message: Stringable, context: object = {}): void {
        this.log(LogLevel.DEBUG, message, context)
    }

    /**
     * Logs with an arbitrary level.
     *
     * @param  {LogLevel}   level
     * @param  {Stringable} message
     * @param  {array}      context
     * @return {void | never}
     * @throws {TypeError}
     */
    log(level: LogLevel, message: Stringable, context: object = {}): void | never {
        if (!(level.toUpperCase() in ConsoleMethod))
            throw new TypeError(`invalid level: ${level}`)

        const consoleMethod =
            ConsoleMethod[level.toUpperCase() as keyof typeof ConsoleMethod]

        this.console[consoleMethod](message.toString(), context)
    }
}
