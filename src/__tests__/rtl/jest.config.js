/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    // react testing library config
    preset: 'ts-jest',

    transform: {
        '^.+\\.tsx?$': [
            '@swc/jest',
            {
                jsc: {
                    transform: {
                        react: {
                            runtime: 'automatic',
                        },
                    },
                },
            },
        ],
    },

    testMatch: ['**/__tests__/rtl/*.test.tsx'],

    // Module file extensions for importing
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    rootDir: './../../../',
    moduleNameMapper: {
        '^.+\\.(css|less)$': '<rootDir>/src/__tests__/config/CssStub.js',
        '^uuid$': require.resolve('uuid'),
    },
    testEnvironment: 'jsdom',
};
