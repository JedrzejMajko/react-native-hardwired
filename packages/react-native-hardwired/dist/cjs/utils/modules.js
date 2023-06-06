"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModuleReference = exports["default"] = void 0;
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
 * Runs module statement and returns reference to it.
 * @param config
 * @param module Hash of module name
 */
var getModuleReference = function getModuleReference(config, module) {
  if (typeof config.runModuleStatement !== "function") {
    return null;
  }
  try {
    var moduleData = config.runModuleStatement(module);
    return moduleData;
  } catch (e) {
    console.error("Hardwired: cannot load module", e);
    return null;
  }
};
exports.getModuleReference = getModuleReference;
var _default = {
  getModuleReference: getModuleReference
};
exports["default"] = _default;
//# sourceMappingURL=modules.js.map