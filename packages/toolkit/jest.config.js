/* eslint-disable @typescript-eslint/no-var-requires */

const baseConfig = require("../../jest.base.config");

module.exports = {
  ...baseConfig,
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": ["@swc/jest"],
  },
  testMatch: ["**/*.test.ts"],
};
