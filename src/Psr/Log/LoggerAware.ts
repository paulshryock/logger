import { Logger } from './Logger.ts'

/**
 * Describes a logger-aware instance.
 */
export interface LoggerAware {
    /**
     * Sets a logger instance on the object.
     *
     * @param  {Logger} logger
     * @return {void}
     */
    setLogger(logger: Logger): void
}
