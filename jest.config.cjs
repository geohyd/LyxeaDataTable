/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@dao(.*)$': '<rootDir>/lib/dao$1',
    '^@dto(.*)$': '<rootDir>/lib/dto$1',
    '^@dom(.*)$': '<rootDir>/lib/dom$1',
    '^@core(.*)$': '<rootDir>/lib/core$1',
    '^@plugins(.*)$': '<rootDir>/lib/plugins$1',
  },
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    html: '<html lang="zh-cmn-Hant"><body></body></html>',
  },
};
