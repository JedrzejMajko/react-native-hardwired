/*
 * Hardwired Copyright (c) 2023 Jędrzej Majko (jdrzjm@gmail.com)
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

const fs = require('fs');
const Module = require('module');
const finalize = require('./utils/finalize.js');
const getMainPath = require('./utils/mainPath.js');

/**
 * Generate readable map from map file (it's an array ;))
 * @param options
 * @returns {{}|any}
 */
const generateDict = options => {
  const resolvePath = options.mainPath + options.mapFile;
  if (fs.existsSync(resolvePath) === false) {
    throw new Error('Hardwired: Map file not found in ', resolvePath);
  }
  try {
    return JSON.parse(fs.readFileSync(resolvePath, 'utf8'));
  } catch (e) {
    console.error('Hardwired: Cannot read JSON map file', resolvePath, e);
    return {};
  }
};

/**
 * Hardwire your code, returns a stringified, hardwired json
 * @param options
 * @returns {Promise<string|void|null>}
 */
module.exports = async options => {
  if (typeof options.mainPath === 'undefined') {
    options.mainPath = getMainPath();
  }
  const buildLinking = generateDict(options);
  const {
    moduleLoader
  } = require('./utils/moduleLoader.js');
  Module._load = moduleLoader(buildLinking, options);
  try {
    const {
      transpiled,
      entryFile,
      deps
    } = await require('./transpile.js')(options);
    return await finalize(transpiled, options, entryFile, deps);
  } catch (e) {
    console.error('Hardwired', e);
    return null;
  }
};
//# sourceMappingURL=prepare.js.map