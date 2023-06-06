const sharedPresets = ['@babel/preset-react', '@babel/typescript'];
const plugins = [
  '@babel/plugin-transform-flow-strip-types',
  '@babel/plugin-proposal-export-namespace-from',
];
const shared = {
  ignore: ['src/**/*.spec.ts'],
  presets: sharedPresets,
  plugins: plugins,
};

module.exports = {
  env: {
    esmUnbundled: shared,
    esmBundled: {
      ...shared,
      presets: [
        [
          '@babel/env',
          {
            targets: '> 0.25%, not dead',
          },
        ],
        ...sharedPresets,
      ],
      plugins: plugins,
    },
    cjs: {
      ...shared,
      presets: [
        [
          '@babel/env',
          {
            modules: 'commonjs',
          },
        ],
        ...sharedPresets,
      ],
      plugins: plugins,
    },
  },
};
/*
{
  "presets": [["@babel/preset-env", { "loose": true, "modules": false }],"@babel/preset-react", "@babel/preset-typescript"],
  "plugins": [
    "@babel/plugin-transform-flow-strip-types",
    "@babel/plugin-proposal-export-namespace-from"
  ],
  "ignore": []
}
 */
