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
const path = require('path');
const bundler = require('./utils/bundler.js');
const transformHelpers = require('metro/src/lib/transformHelpers');

module.exports = async (cliOptions) => {
  const entryFile = path.resolve(cliOptions.file);
  const mainPath = cliOptions.mainPath;
  const options = {};

  /**
   * Blocks Metro from printing warnings to console
   * @type {{(message?: any, ...optionalParams: any[]): void, (...data: any[]): void}}
   */
  const oldConsoleWarn = console.warn;
  const oldConsoleLog = process.stdout.write;
  console.warn = function () {};
  process.stdout.write = function () {};

  const { _bundler, _deltaBundler, config } = await bundler(options, mainPath);

  const resolverOptions = {};
  const transformOptions = {};

  const deps = await transformHelpers.getResolveDependencyFn(
    _bundler,
    transformOptions.platform,
    resolverOptions
  );

  const dt = await transformHelpers.getTransformFn(
    [entryFile],
    _bundler,
    _deltaBundler,
    config,
    transformOptions,
    resolverOptions
  );

  const transpiled = await dt(entryFile);

  console.warn = oldConsoleWarn;
  process.stdout.write = oldConsoleLog;

  return { transpiled: transpiled, entryFile: entryFile, deps: deps };
};
