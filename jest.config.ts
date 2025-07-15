import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm", // ✅ for ES modules
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {
      useESM: true,
      tsconfig: "<rootDir>/tsconfig.json", // make sure this file exists
    }],
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", // Fixes ESM import errors
  },
};

export default config;
