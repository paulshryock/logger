import { BaseLogger } from '../BaseLogger.ts'
import { Console } from 'node:console'
import { ConsoleMethod } from './ConsoleMethod.ts'
import { LogContext } from '../../Psr/Log/LogContext.ts'
import { LogLevel } from '../../Psr/Log/LogLevel.ts'
import { stderr, stdout } from 'node:process'
import { Stringable } from '../../Stringable.ts'

export class ConsoleLogger extends BaseLogger {
    constructor(private console: Console = new Console({ stderr, stdout })) {
        super()
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
    override log(
        level: LogLevel,
        message: Stringable,
        context: LogContext = {},
    ): void | never {
        if (!(level.toUpperCase() in ConsoleMethod))
            throw new TypeError(`invalid level: ${level}`)

        const consoleMethod =
            ConsoleMethod[level.toUpperCase() as keyof typeof ConsoleMethod]

        const args: Stringable[] =
            [this.interpolate(message, context)]

        if (Object.keys(context).length > 0)
            args.push(context)

        this.console[consoleMethod](...args)
    }
}
