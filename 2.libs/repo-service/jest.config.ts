import { join } from "path";

import { ProjectTypes, getJestConfig } from "@plgrnd/tools";

const jestConfig = getJestConfig({
  baseConfigPath: join(__dirname, "../../configs/tests/jest.config.base.ts"),
  projectName: "repo-service",
  projectType: ProjectTypes.Lib,
});

export default jestConfig;
