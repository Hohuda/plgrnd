import baseConfig from "./jest.config.base";

export default {
  ...baseConfig,
  moduleFileExtensions: ["ts", "js", "html", "tsx", "jsx"],
  snapshotResolver: "../../configs/tests/setup/snapshot-resolver.ts",
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    "\\.svg$": "<rootDir>/../../configs/tests/mocks/svg.mock.ts",
  },
};
