import { Logger } from './Logger.ts'

/**
 * Describes a logger-aware instance.
 *
 * @since unreleased
 */
export interface LoggerAware {
	/**
	 * Sets a logger instance on the object.
	 *
	 * @param  {Logger} logger The logger to give this object.
	 * @return {void}
	 *
	 * @since  unreleased
	 */
	setLogger(logger: Logger): void
}
