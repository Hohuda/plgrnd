import { resolve } from "path";

import { withReact } from "@nx/react";
import { composePlugins, withNx } from "@nx/webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as TerserPlugin from "terser-webpack-plugin";
import { withExampleAppEnvsCheck, isRuleSetRule } from "tools";
import { parseSwcConfig } from "tools/utils/parse-swc-config";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { merge } from "webpack-merge";
import { WebpackNoModulePlugin } from "webpack-nomodule-plugin";

import type { Configuration, WebpackPluginInstance } from "webpack";

const commonChunks = ["runtime", "polyfills", "vendor", "main"];

const webpackConfig = composePlugins(
  withExampleAppEnvsCheck(),
  withNx(),
  withReact(),
  (nxConfig) => {
    const config = nxConfig;

    const jsSwcConfig = parseSwcConfig({
      path: resolve(__dirname, "../../configs/swc/js-react.swcrc.json"),
    });

    const tsSwcConfig = parseSwcConfig({
      path: resolve(__dirname, "../../configs/swc/ts-react.swcrc.json"),
    });

    // nx preconfigures swc-loader for jsx|tsx itself
    // github.com/nrwl/nx/blob/d7cd1538e5c1bcd45ec0a58815a83bb40c5f9c80/packages/webpack/src/utils/with-nx.ts#L311
    // so we remove it to set our own
    const newRules = config.module?.rules?.filter(
      (rule) =>
        isRuleSetRule(rule) && rule.loader !== require.resolve("swc-loader")
    );
    if (typeof newRules !== "undefined") {
      config.module = {
        ...config.module,
        rules: newRules,
      };
    }

    // nx preconfigures terser webpack swc minification
    // github.com/nrwl/nx/blob/d7cd1538e5c1bcd45ec0a58815a83bb40c5f9c80/packages/webpack/src/utils/with-nx.ts#L221
    // so we remove it to set our own
    const newMinimizer = config.optimization?.minimizer?.filter(
      (pluginInst) => pluginInst?.constructor.name !== "TerserPlugin"
    );
    if (typeof newMinimizer !== "undefined") {
      config.optimization = {
        ...config.optimization,
        usedExports: config.mode === "production",
        minimizer: [
          new TerserPlugin({
            minify: TerserPlugin.swcMinify,
            terserOptions: {
              compress: {
                arrows: false,
                drop_debugger: false,
              },
              mangle: true,
            },
          }),
          ...newMinimizer,
        ],
      };
    }

    const customConfig: Configuration = {
      // FOR DEBUG PURPOSES, DON'T REMOVE
      /* stats: {
        all: true,
        entrypoints: true,
        chunkGroups: true,
        timings: true,
        errors: true,
        colors: true,
        usedExports: true,
        modules: true,
        children: true,
        excludeAssets: [/\.*\.map/],
      }, */
      plugins: [
        new HtmlWebpackPlugin({
          filename: "index.html",
          template: "./src/index.html",
          chunks: commonChunks,
          chunksSortMode: "manual",
          favicon: "./assets/Minecon.jpg",
          scriptLoading: "module",
          title: "Index | Example Webpack App",
        }),
        new WebpackNoModulePlugin({
          filePatterns: ["polyfill.**.js", "polyfills.**.js"],
        }) as WebpackPluginInstance,
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          openAnalyzer: false,
        }),
      ],
      output: {
        filename: "[name].[contenthash].js",
        chunkFilename: "[name].[contenthash].bundle.js",
        // nx sets 'module' by default which IE doesn't support
        scriptType: "module",
      },

      optimization: {
        splitChunks: {
          cacheGroups: {
            reactVendors: {
              test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|.*remix-run\/router.*|react-router)[\\/]/,
              name: "react-vendors",
              chunks: "all",
              priority: 40,
              enforce: true,
            },
          },
        },
        realContentHash: true,
      },
      // reconfigured, because @nx/webpack executor
      // doesn't allow to set an array for options.target
      target: ["web", "es5"],
      module: {
        rules: [
          {
            test: /\.(js|jsx|mjs|cjs)?$/,
            // transpile non es5 modules
            exclude: {
              and: [/node_modules/],
              not: [
                /@floating-ui/,
                /@griffel/,
                /@fluentui/,
                /keyborg/,
                /tabster/,
                /use-disposable/,
              ],
            },
            use: [
              {
                loader: require.resolve("swc-loader"),
                options: jsSwcConfig,
              },
            ],
          },
          {
            test: /\.(ts|tsx)?$/,
            exclude: [/node_modules/],
            use: [
              {
                loader: require.resolve("swc-loader"),
                options: tsSwcConfig,
              },
            ],
          },
        ],
      },
    };

    const resultConfig = merge(config, customConfig);

    return resultConfig;
  }
);

export default webpackConfig;
