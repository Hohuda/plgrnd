import baseConfig from "./jest.config.base";

export default {
  ...baseConfig,
  moduleFileExtensions: ["ts", "js", "html", "tsx", "jsx"],
  snapshotResolver: "../../configs/tests/snapshot-resolver.ts",
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    "\\.svg$": "<rootDir>/../../mocks/svg.mock.ts",
  },
};
