/* eslint-disable sort-exports/sort-exports */
export const {
  // Common
  NX_ENV_VAR,

  // Example App
  NX_EXAMPLE_APP_URL,
} = process.env;

// Common
export const ENV_VAR = NX_ENV_VAR as string;

// Example App
export const EXAMPLE_APP_URL = NX_EXAMPLE_APP_URL as string;

export const EXAMPLE_APP_URL_OPTIONAL_ENVS = {
  NX_ENV_VAR,
};

export const EXAMPLE_APP_URL_REQUIRED_ENVS = {
  NX_EXAMPLE_APP_URL,
};

export const EXAMPLE_APP_ENVS = {
  required: EXAMPLE_APP_URL_REQUIRED_ENVS,
  optional: EXAMPLE_APP_URL_OPTIONAL_ENVS,
};
