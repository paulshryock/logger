import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	jest,
} from '@jest/globals'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'

// eslint-disable-next-line no-var -- var is hoisted with jest.mock.
var mockInstall = jest.fn()
const envOriginal = process.env
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const filePath = resolve(__dirname, '../../../bin/prepare.ts')

jest.unstable_mockModule('husky', () => ({ default: mockInstall }))

beforeEach(() => {
	jest.resetModules()
})

afterEach(() => {
	process.env = envOriginal
})

describe('when ci environment variable is not set', () => {
	beforeEach(() => {
		delete process.env.CI
	})

	it('should install husky', async () => (
		await import(filePath), expect(mockInstall).toHaveBeenCalledTimes(1)
	))
})

describe('when ci environment variable is "true"', () => {
	beforeEach(() => {
		process.env.CI = 'true'
	})

	it('should not install husky', async () => (
		await import(filePath), expect(mockInstall).toHaveBeenCalledTimes(0)
	))
})
