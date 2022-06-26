import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  globals: {
    "ts-jest": {
      babelConfig: true,
    },
  },
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  testRegex: ".test.(tsx?)$",
  transform: {
    "^.+\\.(j|t)sx?$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!@react-dnd|react-dnd|dnd-core|react-dnd-html5-backend)"],
};
export default config;
