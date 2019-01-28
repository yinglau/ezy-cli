module.exports = {
  collectCoverageFrom: [
    'src/{components|containers}/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
  ],
  setupFiles: ['<rootDir>/internals/testing/enzyme-setup.js'],
  // setupTestFrameworkScriptFile: '<rootDir>/internals/testing/test-bundler.js',
  // coverageThreshold: {
  //   global: {
  //     statements: 98,
  //     branches: 91,
  //     functions: 98,
  //     lines: 98,
  //   },
  // },
  moduleDirectories: ['node_modules', 'src'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    // "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    ".*\\.(css|less|scss)$": "<rootDir>/__mocks__/styleMock.js"
  }
};
