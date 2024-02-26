import jestConfig from "next/jest.js";

const createJestConfig = jestConfig({
  dir: "./",
});

/** @type {import ("jest").Config} */
const config = {
  collectCoverage: false,
  moduleNameMapper: {
    // Only needed for what is not covered by tsconfig's `paths` option
    "^utils/(.*)$": "<rootDir>/utils/$1",
  },
  setupFilesAfterEnv: [
    "<rootDir>/setupTests.ts"
  ],
  testEnvironment: "jest-environment-jsdom",
};

export default createJestConfig(config);
