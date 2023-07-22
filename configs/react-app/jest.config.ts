import path from "path";
import { ProjectTypes, getReactJestConfig } from "tools";

const jestConfig = getReactJestConfig({
  baseConfigPath: path.join(
    __dirname,
    "../../configs/tests/jest.config.react.ts"
  ),
  projectName: null,
  projectType: ProjectTypes.App,
});

export default jestConfig;
