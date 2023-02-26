module.exports = {
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/"],
  transformIgnorePatterns: ["/node_modules/(?!truncate-json)$"],
  testMatch: ["**/?(*.)+(test).ts"],
  moduleFileExtensions: ["ts", "json", "js"],
  collectCoverageFrom: ["src/**/*.ts"],
  coveragePathIgnorePatterns: ["/node_modules/", "dataMock"],
  coverageReporters: ["text", "cobertura"],
  // Automatically restore mock state between every test
  restoreMocks: true,
  resetMocks: true,
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
};
