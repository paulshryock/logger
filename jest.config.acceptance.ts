import jestConfig from './jest.config.ts'

export default {
	...jestConfig,
	collectCoverage: false,
	testPathIgnorePatterns: ['/tests/e2e/', '/tests/unit/'],
}
