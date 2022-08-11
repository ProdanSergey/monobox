/* eslint-disable @typescript-eslint/no-var-requires */

const baseConfig = require("../../jest.base.config");

module.exports = {
  ...baseConfig,
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": ["@swc/jest"],
  },
  testMatch: ["**/*.test.ts"],
  collectCoverageFrom: ["!**/node_modules/**", "!**/__mocks__/**", "<rootDir>/src/**/*.ts", "!<rootDir>/src/ports/*"],
};
