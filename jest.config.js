module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src/renderer/src'],
  testMatch: ['**/__tests__/**/*.(ts|tsx|js)', '**/*.(test|spec).(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.web.json'
      }
    ]
  },
  collectCoverageFrom: [
    'src/renderer/src/**/*.(ts|tsx)',
    '!src/renderer/src/**/*.d.ts',
    '!src/renderer/src/main.tsx',
    '!src/renderer/src/env.d.ts'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/renderer/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'jest-transform-stub',
    '^@renderer/(.*)$': '<rootDir>/src/renderer/src/$1'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/out/'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html']
}
