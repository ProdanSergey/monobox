module.exports = {
  verbose: true,
  clearMocks: true,
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": ["@swc/jest"],
  },
  testMatch: ["**/*.test.ts"],
  collectCoverageFrom: ["!**/node_modules/**", "!**/__mocks__/**", "<rootDir>/src/**/*.ts", "!<rootDir>/src/ports/*"],
};
