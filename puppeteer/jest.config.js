module.exports = {
  verbose: true,
  preset: 'jest-puppeteer',
  roots: ['./'],
  testTimeout: 10000, // Messageの表示が遅いため延長
  testMatch: [
    '**/?(*.)+(e2e|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'puppeteer/tsconfig.json'
    }
  },
  "testEnvironment": "./custom-environment.js"
};
