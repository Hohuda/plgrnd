import path = require("path");

import type { JestConfig, ProjectTypes } from "./types";

export const getReactJestConfig = ({
  baseConfigPath,
  projectName,
  projectType,
}: {
  baseConfigPath: string;
  projectName: string | null;
  projectType: ProjectTypes | null;
}): JestConfig => {
  if (!projectName || !projectType)
    throw new Error(
      "getReactJestConfig: 'projectName' and 'projectType' are required!"
    );

  // eslint-disable-next-line
  const extended = require(path.relative(__dirname, baseConfigPath))
    .default as JestConfig;

  return {
    ...extended,
    displayName: projectName,
    transform: {
      "^.+\\.[tj]sx?$": [
        "@swc/jest",
        { jsc: { transform: { react: { runtime: "automatic" } } } },
      ],
    },
    coverageDirectory: `../../coverage/${projectType}/${projectName}`,
  };
};
