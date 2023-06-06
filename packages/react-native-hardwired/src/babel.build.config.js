/*
 * Copyright (c) 2023 Jędrzej Majko (jdrzjm@gmail.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const sharedPresets = ["@babel/preset-react", "@babel/typescript"];
const plugins = [
  "@babel/plugin-transform-flow-strip-types",
  "@babel/plugin-proposal-export-namespace-from",
];
const shared = {
  ignore: ["src/**/*.spec.ts", "babel.config.json"],
  presets: sharedPresets,
  plugins: plugins,
};

export default {
  env: {
    esmUnbundled: shared,
    esmBundled: {
      ...shared,
      presets: [
        [
          "@babel/env",
          {
            targets: "> 0.25%, not dead",
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
          "@babel/env",
          {
            modules: "commonjs",
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
