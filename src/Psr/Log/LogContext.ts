import { Stringable } from '../../Stringable.ts'

/**
 * Logging context for logged messages.
 *
 * @since unreleased
 */
export interface LogContext extends Record<string, Stringable> {
	exception?: Error
}
