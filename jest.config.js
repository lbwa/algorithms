/**
 * SHOULD read https://jestjs.io/docs/en/configuration.html first
 */
module.exports = {
  coverageDirectory: 'coverage',

  coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],

  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],

  // https://jestjs.io/docs/en/configuration#modulenamemapper-objectstring-string--arraystring
  moduleNameMapper: {
    '^data-structures/(.*)': '<rootDir>/data-structures/$1',
    '^sorts/(.*)': '<rootDir>/sorts/$1',
    '^shared/(.*)': '<rootDir>/shared/$1',
  },

  preset: 'ts-jest',

  roots: ['<rootDir>'],

  testEnvironment: 'node',

  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],

  testPathIgnorePatterns: ['\\\\node_modules\\\\', '\\\\dist\\\\'],
}
