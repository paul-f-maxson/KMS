const { defaults } = require('jest-config');
module.exports = {
  testPathIgnorePatterns: [
    ...defaults.testPathIgnorePatterns,
    '<rootDir>/src/client',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
