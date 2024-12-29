import { describe, expect, it } from '@jest/globals'
import { dirname, join } from 'node:path'
import { fileURLToPath as fileUrlToPath } from 'node:url'
import { stat } from 'node:fs/promises'

const __filename = fileUrlToPath(import.meta.url)
const __dirname = dirname(__filename)

const BUNDLE_MAXIMUM_KIB = 5
const BUNDLE_MAXIMUM_SIZE = BUNDLE_MAXIMUM_KIB * 1024

describe('compiled javascript bundle', () => {
	const pathToBundle = join(__dirname, '..', '..', 'dist', 'index.js')

	it(`should be no more than ${BUNDLE_MAXIMUM_KIB} KiB`, async () =>
		expect((await stat(pathToBundle)).size).toBeLessThan(BUNDLE_MAXIMUM_SIZE))
})
