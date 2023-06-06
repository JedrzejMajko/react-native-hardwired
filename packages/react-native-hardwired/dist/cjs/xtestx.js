"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xtestx = void 0;
var _createModuleIdFactoryRN = require("./utils/createModuleIdFactoryRN");
var _errors = require("./errors");
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

var xtestx = function xtestx(config) {
  if (!config.runModuleStatement || typeof config.runModuleStatement !== "function") {
    (0, _errors.reportError)("No required module method found. Setup it in config under the key: runModuleStatement");
    return false;
  }
  var moduleIdFactory = (0, _createModuleIdFactoryRN.createModuleIdFactory)()("react-native");
  if (isNaN(moduleIdFactory) || moduleIdFactory === 0) {
    (0, _errors.reportError)("Cannot generate module id. createModuleIdFactory method is unavailable.");
    return false;
  }
  /*
  add context swap
  const rnDefaultRequire = global[config.runModuleStatement](1);
  if (rnDefaultRequire !== null) {
    reportError(
      "Looks like you're using react-native default require. Please use hardwired require instead. Add to your metro.config.js:\n" +
        "import section:\nimport {createModuleIdFactory} from 'coobers/rn-hardwired/dist/utils/createModuleIdFactoryNode';\n\n" +
        'into default export a key:\nserializer:\n{\n' +
        '  createModuleIdFactory: createModuleIdFactory\n' +
        '}' +
        '\n\nThen, restart your metro server react-native start',
    );
    return false;
  }*/

  return true;
};
exports.xtestx = xtestx;
//# sourceMappingURL=xtestx.js.map