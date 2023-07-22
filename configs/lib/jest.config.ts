import path = require("path");

import { ProjectTypes, getJestConfig, parseSwcJestConfig } from "tools";

const jestConfig = getJestConfig({
  baseConfigPath: path.join(
    __dirname,
    "../../configs/tests/jest.config.base.ts"
  ),
  projectName: null,
  projectType: ProjectTypes.Lib,
  swcJestConfig: parseSwcJestConfig(`${__dirname}/.swcrc`),
});

export default jestConfig;
