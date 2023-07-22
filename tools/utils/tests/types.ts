export enum ProjectTypes {
  App = "1.apps",
  Lib = "2.libs",
}

export interface JestConfig {
  displayName: string;
  preset?: string;
  transform?: any;
  moduleFileExtensions?: string[];
  coverageDirectory?: string;
  setupFiles?: string[];
  transformIgnorePatterns?: string[];
  snapshotResolver?: string;
  moduleNameMapper: Record<string, string>;
  [x: string]: any;
}
