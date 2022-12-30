/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    // unit test config
    preset: 'ts-jest',

    transform: {
        '^.+\\.tsx?$': '@swc/jest',
    },
    testMatch: ['**/__tests__/unit/*.test.ts'],

    moduleFileExtensions: ['ts', 'js'],
};
