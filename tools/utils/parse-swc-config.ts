import { readFileSync } from "fs";

import type { Options as SwcOptions } from "@swc/core";

interface ParseSwcConfigArgs {
  path: string;
}

export const parseSwcConfig = ({ path }: ParseSwcConfigArgs): SwcOptions =>
  JSON.parse(readFileSync(path, "utf-8")) as SwcOptions;
