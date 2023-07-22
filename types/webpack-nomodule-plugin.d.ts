declare module "webpack-nomodule-plugin" {
  export class WebpackNoModulePlugin {
    constructor({ filePatterns }: { filePatterns: string[] });
  }
}
