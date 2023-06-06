/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const {
  createModuleIdFactory,
} = require('react-native-hardwired/dist/cjs/utils/createModuleIdFactoryNode');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  serializer: {
    createModuleIdFactory: createModuleIdFactory,
  },
};
