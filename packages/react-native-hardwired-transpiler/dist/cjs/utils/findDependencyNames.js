"use strict";

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

/**
 * Guesses possible names of the dependency, when original import will fail.
 * Fallback option to ensure code execution.
 * @param packageName
 * @param names
 * @returns {*}
 */
module.exports = function (packageName, names) {
  for (var _i = 0, _arr = ['', '.js', '/index.js', '/main.js', '/dist/index.js', '/lib/index.js']; _i < _arr.length; _i++) {
    var suffix = _arr[_i];
    names.push(packageName + suffix);
  }
  return names;
};
//# sourceMappingURL=findDependencyNames.js.map