import { join } from "path";

import { ProjectTypes, getReactJestConfig } from "tools";

const jestConfig = getReactJestConfig({
  baseConfigPath: join(__dirname, "../../configs/tests/jest.config.react.ts"),
  projectName: "example-webpack-app",
  projectType: ProjectTypes.App,
});

export default jestConfig;
