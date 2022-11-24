module.exports = {
  verbose: true,
  clearMocks: true,
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.ts?$": ["@swc/jest"],
  },
  testMatch: ["**/*.test.ts"],
  collectCoverageFrom: ["!**/node_modules/**", "<rootDir>/src/**/*.ts", "!<rootDir>/src/builders/*"],
};
