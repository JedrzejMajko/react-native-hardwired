module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  overrides: [],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  rules: {
    eqeqeq: 'off',
    curly: 'error',
    quotes: ['off'],
  },
};
