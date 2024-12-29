import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import {
	CommandLineLogger,
	CommandLineMethod,
} from '../../../src/Logger/CommandLineLogger.ts'
import { CommandLine } from '@paulshryock/abstractions'
import { Duplex } from 'node:stream'
import { LogLevel } from '../../../src/Psr/Log/LogLevel.ts'

const [stdoutLoggerMethods, stderrLoggerMethods] = Object.values(
	LogLevel,
).reduce(
	(methods: [LogLevel[], LogLevel[]], level) => {
		methods[{ error: 1, out: 0 }[CommandLineMethod[level]]].push(level)
		return methods
	},
	[[], []],
)

describe('when a command line logger is instantiated', () => {
	const logger = new CommandLineLogger()

	it('should be a command line logger instance', () =>
		expect(logger).toBeInstanceOf(CommandLineLogger))
})

describe('when a command line logger has a command line with streams', () => {
	let streams: {
		stderr: Duplex
		stdin: Duplex
		stdout: Duplex
	}
	let commandLine: CommandLine
	let logger: CommandLineLogger

	beforeEach(() => {
		streams = {
			stderr: new Duplex(),
			stdin: new Duplex(),
			stdout: new Duplex(),
		}
		;(streams.stderr.write as jest.Mock) = jest.fn()
		;(streams.stdout.write as jest.Mock) = jest.fn()

		streams.stderr.write.bind(streams.stderr)
		streams.stdout.write.bind(streams.stdout)

		commandLine = new CommandLine(streams)
		logger = new CommandLineLogger(commandLine)
	})

	describe.each(stdoutLoggerMethods)(
		'should write a message to stdout',
		(level) => {
			it(`CommandLineLogger.${level}`, () => {
				logger[level]('hello')
				logger.log(level, 'hello')

				// eslint-disable-next-line @typescript-eslint/unbound-method -- Works fine.
				expect(streams.stdout.write).toHaveBeenCalledTimes(2)
			})
		},
	)

	describe.each(stderrLoggerMethods)(
		'should write a message to stderr',
		(level) => {
			it(`CommandLineLogger.${level}`, () => {
				logger[level]('oops')
				logger.log(level, 'oops')

				// eslint-disable-next-line @typescript-eslint/unbound-method -- Works fine.
				expect(streams.stderr.write).toHaveBeenCalledTimes(2)
			})
		},
	)

	it('should interpolate contextual data', () => {
		logger.log(LogLevel.DEBUG, 'Hello, {name}!', { another: 1, name: 'Name' })

		// eslint-disable-next-line @typescript-eslint/unbound-method -- Works fine.
		expect(streams.stdout.write).toHaveBeenCalledWith(
			'Hello, Name!\n',
			expect.anything(),
		)
	})
})
