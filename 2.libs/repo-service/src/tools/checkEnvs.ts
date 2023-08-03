import { EXAMPLE_APP_URL_REQUIRED_ENVS } from "../consts";

import type { NxWebpackPlugin } from "@nx/webpack";

export function withEnvsCheck(
  envsObject: Record<string, string | undefined>
): NxWebpackPlugin {
  return function checkEnvs(config) {
    const missingEnvs = Object.entries(envsObject).filter(([, envValue]) => {
      return !envValue;
    });
    const missingEnvsNames = missingEnvs.map(([envName]) => envName);

    if (missingEnvs.length !== 0)
      throw new Error(
        `ERROR: ENV MISSING! Please set next envs in mono-fe/.env file:
        Missing ENVs list:
        ${missingEnvsNames.join(`
        `)}`
      );

    return config;
  };
}

export function withExampleAppEnvsCheck(): NxWebpackPlugin {
  return withEnvsCheck(EXAMPLE_APP_URL_REQUIRED_ENVS);
}
