module.exports = {
  verbose: true,
  clearMocks: true,
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": ["@swc/jest"],
  },
  testMatch: ["**/*.test.ts"],
  collectCoverageFrom: [
    "!**/node_modules/**",
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/ports/*",
    "!<rootDir>/src/types/*",
  ],
};
