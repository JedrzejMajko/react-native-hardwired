module.exports = async function (options) {
  const args = {
    platform: options.platform,
    dev: false,
    bundleEncoding: "utf8",
    sourcemapUseAbsolutePath: false,
    resetCache: true,
    readGlobalCache: false,
    generateStaticViewConfigs: true,
    entryFile: options.entryFile,
    bundleOutput: "/dev/null",
    assetsDest: "/",
    minify: true,
  };

  const ctx = {
    projectRoot: options.mainPath,
    reactNativePath: null, // allow it to fail//mainPath+"/node_modules/react-native",
    root: options.mainPath,
    dependencies: {},
    healthChecks: [],
    platforms: {
      ios: {
        projectConfig: () => {
          //projectConfig
        },
        dependencyConfig: () => {},
      },
      android: {
        projectConfig: () => {},
        dependencyConfig: () => {},
      },
    },

    server: {
      unstable_serverRoot: options.mainPath,
    },

    project: () => {},
  };

  const Server = require("../../metro/src/Server");
  const _Server = function () {
    return Server;
  };

  const { getDefaultConfig, mergeConfig } = require("../../metro-config");
  const outputBundle = require("../../metro/src/shared/output/bundle");
  const _loadMetroConfig = require("../../@react-native-community/cli-plugin-metro/build/tools/loadMetroConfig");

  const commandConfig = await (0, _loadMetroConfig.default)(ctx, {
    maxWorkers: args.maxWorkers,
    resetCache: args.resetCache,
  });

  const defaultConfig = await getDefaultConfig(options.mainPath);
  const config = mergeConfig(defaultConfig, commandConfig);

  const server = new (_Server())(config);

  const sourceMapUrl = undefined;

  const requestOpts = {
    entryFile: args.entryFile,
    sourceMapUrl: sourceMapUrl,
    dev: args.dev,
    minify: args.minify,
    platform: args.platform,
    unstable_transformProfile: args.unstableTransformProfile,
    generateStaticViewConfigs: args.generateStaticViewConfigs,
  };

  const bundle = await outputBundle.build(server, requestOpts);

  return bundle;
};
