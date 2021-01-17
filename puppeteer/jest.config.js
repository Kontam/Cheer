module.exports = {
  verbose: true,
  preset: 'jest-puppeteer',
  roots: ['./'],
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
  }
};
