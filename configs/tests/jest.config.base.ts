export default {
  preset: "../../configs/tests/jest.preset.ts",
  moduleFileExtensions: ["ts", "js", "html"],
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ["<rootDir>../../configs/tests/text-encoder-init.ts"],
  transformIgnorePatterns: [
    "node_modules/(?!camelcase-keys|camelcase|quick-lru)",
  ],
  moduleNameMapper: {
    "^@plgrnd/example-ts-lib":
      "<rootDir>/../../2.libs/example-ts-lib/src/index.ts",
    // jest supports ESM not perfectly so we tweek it to use commonjs lodash
    "^lodash-es$": "lodash",
  },
};
