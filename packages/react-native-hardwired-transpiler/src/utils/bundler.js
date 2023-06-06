function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const { getDefaultConfig, mergeConfig } = require('metro-config');

const _loadMetroConfig = _interopRequireDefault(
  require('@react-native-community/cli-plugin-metro/build/tools/loadMetroConfig')
);

async function getConfig(config) {
  const defaultConfig = await getDefaultConfig(config.projectRoot);
  return mergeConfig(defaultConfig, config);
}

const Bundler = require('metro/src/Bundler');
const DeltaBundler = require('metro/src/DeltaBundler');

/**
 * Basic metro setup.
 * @FIXME use metro.config.js to startup
 * @param globalOptions
 * @param mainPath
 * @returns {Promise<{_bundler: Bundler, _deltaBundler: DeltaBundler<MixedOutput>, config: *}>}
 */
module.exports = async function (globalOptions, mainPath) {
  const args = {
    platform: globalOptions.platform || 'android',
    dev: false,
    bundleEncoding: 'utf8',
    sourcemapUseAbsolutePath: false,
    resetCache: true,
    readGlobalCache: false,
    generateStaticViewConfigs: true,
    entryFile: globalOptions.entryFile || 'index.js',
    bundleOutput: '/dev/null',
    assetsDest: globalOptions.assetsDest || '/',
    minify: true,
  };

  const ctx = {
    root: mainPath,
    dependencies: {},
    healthChecks: [],
    platforms: {
      ios: {
        projectConfig: () => {},
        dependencyConfig: () => {},
      },
      android: {
        projectConfig: () => {},
        dependencyConfig: () => {},
      },
    },
    project: () => {},
  };

  const commandConfig = await (0, _loadMetroConfig.default)(ctx, {
    maxWorkers: args.maxWorkers,
    resetCache: args.resetCache,
    config: args.config,
  });

  const options = {};

  const config = await getConfig(commandConfig);

  const _bundler = new Bundler(config, options);
  const _deltaBundler = new DeltaBundler(_bundler.getWatcher());

  return {
    _bundler,
    _deltaBundler,
    config,
  };
};
