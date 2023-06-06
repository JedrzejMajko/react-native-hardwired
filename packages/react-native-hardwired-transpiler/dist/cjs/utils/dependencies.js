"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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

var path = require('path');
var _require = require('./createModuleIdFactoryNode.js'),
  createModuleIdFactory = _require.createModuleIdFactory;
var findDependencyNames = require('./findDependencyNames.js');

/**
 * Build hardwired dependency object based on metro's dependencies
 * @param dependencies
 * @param entryFile
 * @param deps
 * @param cliOptions
 * @returns {*}
 */
module.exports = function (dependencies, entryFile, deps, cliOptions) {
  var transformationList = {};
  return dependencies.map(function (dependency) {
    var resolve = deps(entryFile, dependency.name);
    var names = [];
    if (typeof transformationList[dependency.name] !== 'undefined') {
      names.push(transformationList[dependency.name]);
    }
    if (_typeof(resolve) === 'object' && resolve !== null && typeof resolve.to !== 'undefined' && resolve.to.length > 0) {
      var xpath = path.relative(cliOptions.mainPath, resolve.to);
      if (xpath) {
        names.push(xpath);
      }
    }
    var prefix = '';
    if (dependency.name.substring(0, 2) != './') {
      prefix = 'node_modules/';
    }
    findDependencyNames(prefix + dependency.name, names);
    var factory = createModuleIdFactory();
    var hashes = names.map(function (name) {
      var hash = factory(name);
      return hash;
    });
    return cliOptions.noDependencyNames ? {
      hashes: hashes
    } : {
      hashes: hashes,
      names: names
    };
  });
};
//# sourceMappingURL=dependencies.js.map