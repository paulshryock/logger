import { LoggerInterface } from './LoggerInterface.ts'

/**
 * Describes a logger-aware instance.
 */
export interface LoggerAwareInterface {
    /**
     * Sets a logger instance on the object.
     *
     * @param  {LoggerInterface} logger
     * @return {void}
     */
    setLogger(logger: LoggerInterface): void
}
