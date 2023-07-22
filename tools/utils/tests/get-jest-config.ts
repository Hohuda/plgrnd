import path = require("path");

import { parseSwcConfig } from "../parse-swc-config";

import type { JestConfig, ProjectTypes } from "./types";
import type { Options as SwcOptions } from "@swc/core";

export const parseSwcJestConfig = (swcPath: string): SwcOptions => {
  // Reading the SWC compilation config and remove the "exclude"
  // for the test files to be compiled by SWC
  const swcJestConfig = parseSwcConfig({ path: swcPath });
  delete swcJestConfig.exclude;

  // disable .swcrc look-up by SWC core because we're passing in swcJestConfig ourselves.
  // If we do not disable this, SWC Core will read .swcrc and won't transform our test files due to "exclude"
  if (swcJestConfig.swcrc === undefined) {
    swcJestConfig.swcrc = false;
  }

  return swcJestConfig;
};

// eslint-disable-next-line sort-exports/sort-exports
export const getJestConfig = ({
  baseConfigPath,
  projectName,
  projectType,
}: // swcJestConfig,
{
  baseConfigPath: string;
  projectName: string | null;
  projectType: ProjectTypes | null;
  // swcJestConfig: SwcOptions;
}): JestConfig => {
  if (!projectName || !projectType)
    throw new Error(
      "getJestConfig: 'projectName' and 'projectType' are required!"
    );

  // eslint-disable-next-line
  const extended = require(path.relative(__dirname, baseConfigPath))
    .default as JestConfig;

  return {
    ...extended,
    displayName: projectName,
    transform: {
      // external swcConfig is disabled for now, default swc config seems to do the job
      // "^.+\\.[tj]s$": ["@swc/jest", swcJestConfig],
      "^.+\\.[tj]s$": ["@swc/jest"],
    },
    coverageDirectory: `../../coverage/${projectType}/${projectName}`,
  };
};
