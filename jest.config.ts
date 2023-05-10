export default {
	clearMocks: true,
	collectCoverage: true,
	collectCoverageFrom: ['bin/**/*', 'src/**/*'],
	coverageDirectory: 'coverage',
	coverageProvider: 'babel',
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},
	errorOnDeprecated: true,
};
