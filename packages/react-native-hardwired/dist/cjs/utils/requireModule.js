"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requireModule = exports["default"] = void 0;
var _utils = require("../utils");
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

/**
 * Generates hash for the module and registers it in the context
 * @param name module's name
 */
var requireModule = function requireModule(config, name) {
  if (name === null) {
    return null;
  }
  var loadedModuleHash = (0, _utils.getHash)(config, name);
  if (loadedModuleHash === null) {
    var hash = (0, _utils.hashingAlgorithm)(name);
    (0, _utils.registerHash)(config, name, hash);
    loadedModuleHash = hash;
  }
  return loadedModuleHash;
};
exports.requireModule = requireModule;
var _default = {
  requireModule: requireModule
};
exports["default"] = _default;
//# sourceMappingURL=requireModule.js.map