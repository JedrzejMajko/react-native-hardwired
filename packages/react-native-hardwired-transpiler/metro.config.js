/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const {
  createModuleIdFactory,
} = require('./dist/lib/utils/createModuleIdFactoryNode.js');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    aaa: 11,
  },

  serializer: {
    createModuleIdFactory: createModuleIdFactory,
  },
};
