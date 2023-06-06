"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  hashingAlgorithm: true,
  createModuleIdFactory: true
};
Object.defineProperty(exports, "createModuleIdFactory", {
  enumerable: true,
  get: function get() {
    return _createModuleIdFactoryRN.createModuleIdFactory;
  }
});
exports.hashingAlgorithm = void 0;
var _cyrb = _interopRequireDefault(require("./utils/cyrb53"));
var _hashManagement = require("./utils/hashManagement");
Object.keys(_hashManagement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _hashManagement[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _hashManagement[key];
    }
  });
});
var _evaluate = require("./utils/evaluate");
Object.keys(_evaluate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _evaluate[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _evaluate[key];
    }
  });
});
var _modules = require("./utils/modules");
Object.keys(_modules).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _modules[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _modules[key];
    }
  });
});
var _requireModule = require("./utils/requireModule");
Object.keys(_requireModule).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _requireModule[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _requireModule[key];
    }
  });
});
var _constructSource = require("./utils/constructSource");
Object.keys(_constructSource).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _constructSource[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _constructSource[key];
    }
  });
});
var _createModuleIdFactoryRN = require("./utils/createModuleIdFactoryRN");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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

var hashingAlgorithm = _cyrb["default"];
exports.hashingAlgorithm = hashingAlgorithm;
//# sourceMappingURL=utils.js.map