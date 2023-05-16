import { BaseLogger } from '../BaseLogger.ts'
import { LogLevel } from '../../Psr/Log/LogLevel.ts'

export class FileSystemLogger extends BaseLogger {
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
    context: LogContext,
  ): void | never {
    if (!(level.toUpperCase() in LogLevel))
      throw new TypeError(`invalid level: ${level}`)
  }
}
