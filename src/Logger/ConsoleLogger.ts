import { Console } from 'node:console'
import { ConsoleMethod } from './ConsoleLogger/ConsoleMethod.ts'
import {
    InvalidArgumentException,
} from '../Psr/Log/InvalidArgumentException.ts'
import { LoggerInterface } from '../Psr/Log/LoggerInterface.ts'
import { LogLevel } from '../Psr/Log/LogLevel.ts'
import { stderr, stdout } from 'node:process'
import { Stringable } from '../Stringable.ts'

export class ConsoleLogger implements LoggerInterface {
    constructor(private console: Console = new Console({ stderr, stdout })) {}

    /**
     * System is unusable.
     *
     * @param  {string | Stringable} message
     * @param  {array}               context
     * @return {void}
     */
    emergency(message: string | Stringable, context: object = {}): void {
        this.log(LogLevel.EMERGENCY, message, context)
    }

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
    alert(message: string | Stringable, context: object = {}): void {
        this.log(LogLevel.ALERT, message, context)
    }

    /**
     * Critical conditions.
     *
     * Example: Application component unavailable, unexpected exception.
     *
     * @param  {string | Stringable} message
     * @param  {array}               context
     * @return {void}
     */
    critical(message: string | Stringable, context: object = {}): void {
        this.log(LogLevel.CRITICAL, message, context)
    }

    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     *
     * @param  {string | Stringable} message
     * @param  {array}               context
     * @return {void}
     */
    error(message: string | Stringable, context: object = {}): void {
        this.log(LogLevel.ERROR, message, context)
    }

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
    warning(message: string | Stringable, context: object = {}): void {
        this.log(LogLevel.WARNING, message, context)
    }

    /**
     * Normal but significant events.
     *
     * @param  {string | Stringable} message
     * @param  {array}               context
     * @return {void}
     */
    notice(message: string | Stringable, context: object = {}): void {
        this.log(LogLevel.NOTICE, message, context)
    }

    /**
     * Interesting events.
     *
     * Example: User logs in, SQL logs.
     *
     * @param  {string | Stringable} message
     * @param  {array}               context
     * @return {void}
     */
    info(message: string | Stringable, context: object = {}): void {
        this.log(LogLevel.INFO, message, context)
    }

    /**
     * Detailed debug information.
     *
     * @param  {string | Stringable} message
     * @param  {array}               context
     * @return {void}
     */
    debug(message: string | Stringable, context: object = {}): void {
        this.log(LogLevel.DEBUG, message, context)
    }

    /**
     * Logs with an arbitrary level.
     *
     * @param  {LogLevel}            level
     * @param  {string | Stringable} message
     * @param  {array}               context
     * @return {void}
     * @throws {InvalidArgumentException}
     */
    log(level: LogLevel, message: string | Stringable, context: object = {}): void {
        if (!(level.toUpperCase() in ConsoleMethod))
            throw new InvalidArgumentException(`invalid level: ${level}`)

        const consoleMethod =
            ConsoleMethod[level.toUpperCase() as keyof typeof ConsoleMethod]

        this.console[consoleMethod](message.toString(), context)
    }
}
