import path = require("path");

import { ProjectTypes, getJestConfig } from "@plgrnd/tools";

const jestConfig = getJestConfig({
  baseConfigPath: path.join(
    __dirname,
    "../../configs/tests/jest.config.base.ts"
  ),
  projectName: null,
  projectType: ProjectTypes.Lib,
});

export default jestConfig;
