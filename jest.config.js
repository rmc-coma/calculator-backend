const fs = require("fs");

/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
const commonProjectsConfig = {
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
    testPathIgnorePatterns: [".husky/", ".vscode/", "dist/", "coverage/", "node_modules/"],
    testEnvironment: "node",
    globals: {
        "ts-jest": {
            tsconfig: "./tsconfig.json",
            isolatedModules: true,
        },
    },
    moduleNameMapper: fs.readdirSync("./src/").reduce((map, dir) => {
        map[`^${dir}/(.*)$`] = `<rootDir>/src/${dir}/$1`;
        return map;
    }, Object.create(null)),
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    rootDir: "./",
    roots: ["<rootDir>/", "<rootDir>/src/"],
};

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    projects: [
        {
            displayName: "unit",
            testMatch: ["<rootDir>/**/__tests__/**/unit/**/*.(spec|test).[tj]s?(x)"],
        },
        {
            displayName: "integration",
            testMatch: ["<rootDir>/**/__tests__/**/integration/**/*.(spec|test).[tj]s?(x)"],
        },
    ].map(obj => ({ ...commonProjectsConfig, ...obj })),
    collectCoverage: true,
    collectCoverageFrom: [
        "**/*.{js,jsx,ts,tsx}",
        "!**/node_modules/**",
        "!**/.husky/**",
        "!**/.vscode/**",
        "!**/dist/**",
        "!**/coverage/**",
        "!**/__tests__/**",
        "!**/__mocks__/**",
    ],
    coverageDirectory: "<rootDir>/coverage",
    verbose: true,
};
