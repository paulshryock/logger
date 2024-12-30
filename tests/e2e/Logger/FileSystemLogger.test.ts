import { afterAll, expect, test } from '@jest/globals'
import { FileSystemLogger } from '../../../src/Logger/FileSystemLogger.ts'
import { LocalFileSystem } from '@paulshryock/abstractions'

const fileSystem = new LocalFileSystem()
const path = 'tests/e2e/.temp/path/to/file'
const oldMessage = 'old message'
const newMessage = 'new message'

/**
 * Sleeps for a given number of seconds.
 *
 * @param  {number}          seconds Number of seconds to sleep for.
 * @return {Promise<number>}         The returned timeoutID is a positive
 *                                   integer value which identifies the timer
 *                                   created by the call to setTimeout(). This
 *                                   value can be passed to clearTimeout() to
 *                                   cancel the timeout.
 *
 * @since  unreleased
 */
function sleep(seconds: number): Promise<number> {
	return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}

afterAll(async () => fileSystem.deleteDirectory('tests/e2e/.temp'))

test('logging to a file that does not already exist', async () => {
	if (await fileSystem.exists('tests/e2e/.temp'))
		await fileSystem.deleteDirectory('tests/e2e/.temp')

	expect(await fileSystem.exists(path)).toBe(false)
	const logger = await FileSystemLogger.fromPath(path)
	expect(await fileSystem.exists(path)).toBe(true)

	logger.debug(newMessage)

	await sleep(1)

	expect(await fileSystem.readFile(path)).toContain(newMessage)
	expect(await fileSystem.readFile(path)).toMatch(/\n$/u)
})

test('logging to an empty file that does already exist', async () => {
	await fileSystem.writeFile(path, '')
	expect(await fileSystem.exists(path)).toBe(true)

	const logger = await FileSystemLogger.fromPath(path)
	logger.debug(newMessage)

	await sleep(1)

	expect(await fileSystem.readFile(path)).toContain(newMessage)
	expect(await fileSystem.readFile(path)).toMatch(/\n$/u)
})

test('logging to a file with content that does already exist', async () => {
	await fileSystem.writeFile(path, `${oldMessage}\n`)
	expect(await fileSystem.exists(path)).toBe(true)
	expect(await fileSystem.readFile(path)).toContain(oldMessage)
	expect(await fileSystem.readFile(path)).toMatch(/\n/u)

	const logger = await FileSystemLogger.fromPath(path)
	logger.debug(newMessage)

	await sleep(1)

	expect(await fileSystem.readFile(path)).toContain(oldMessage)
	expect(await fileSystem.readFile(path)).toContain(newMessage)
	expect(await fileSystem.readFile(path)).toMatch(/\n$/u)
})
