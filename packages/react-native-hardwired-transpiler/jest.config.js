module.exports = {
  testEnvironment: 'node',
  moduleNameMapper: {
    './dist/lib/utils/createModuleIdFactoryNode.js':
      '<rootDir>/src/utils/createModuleIdFactoryNode.js',
  },
  testPathIgnorePatterns: ['examples/', 'node_modules/'],
};
