"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RequireModule = void 0;
var _react = _interopRequireWildcard(require("react"));
var _modules = require("../utils/modules");
var _errorUtilsContextSwap = require("../utils/errorUtilsContextSwap");
var _config = require("../config");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } /*
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
 * This is the component that is used to load a module using the RN require function or the one defined in configuration (runModuleStatement).
 * @param name Name of the module to run (optional, use this or hash)
 * @param hash Hash of the module to run (optional, use this or name)
 * @param children Children will be placed inside the loaded module
 * @param args Arguments to pass to the loaded module
 * @constructor
 */
var RequireModule = function RequireModule(_ref) {
  var name = _ref.name,
    hash = _ref.hash,
    children = _ref.children,
    args = _ref.args;
  var context = (0, _react.useContext)((0, _config.getContext)());
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    moduleData = _useState2[0],
    setModuleData = _useState2[1];
  (0, _react.useEffect)(function () {
    if (name === null || hash === null) {
      return;
    }
    if (hash !== null) {
      (0, _errorUtilsContextSwap.errorUtilsContextSwap)(function () {
        setModuleData((0, _modules.getModuleReference)(context, hash));
      });
    }
  }, [hash, context, name]);
  if (moduleData && moduleData["default"] && typeof moduleData["default"] === "function") {
    var ModuleComponent = moduleData["default"];
    return /*#__PURE__*/_react["default"].createElement(ModuleComponent, args, children);
  }
  return null;
};
exports.RequireModule = RequireModule;
var _default = {
  RequireModule: RequireModule
};
exports["default"] = _default;
//# sourceMappingURL=RequireModule.js.map