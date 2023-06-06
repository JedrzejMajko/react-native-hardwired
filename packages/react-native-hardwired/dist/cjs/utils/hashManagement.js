"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerHash = exports.getHash = exports["default"] = void 0;
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
 * Creates entry in context's loadedModules object.
 * It allows to check if module is already loaded.
 * @param context
 * @param name
 * @param hash
 */
var registerHash = function registerHash(context, name, hash) {
  context.loadedModules[name] = hash;
  return hash;
};

/**
 * Returns hash of the module if it was already loaded.
 * @param context
 * @param name name of module
 */
exports.registerHash = registerHash;
var getHash = function getHash(context, name) {
  var _context$loadedModule;
  return ((_context$loadedModule = context.loadedModules) === null || _context$loadedModule === void 0 ? void 0 : _context$loadedModule[name]) || null;
};
exports.getHash = getHash;
var _default = {
  getHash: getHash,
  registerHash: registerHash
};
exports["default"] = _default;
//# sourceMappingURL=hashManagement.js.map