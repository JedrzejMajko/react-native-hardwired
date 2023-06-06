"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.evaluate = exports["default"] = void 0;
var _errors = require("../errors");
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
 * Evaluates a string as javascript
 * Using EVAL is considered a bad habit. Code that you inject must be trusted!
 * @param source Source code
 * @returns boolean if the code was valid and execution successful
 */
var evaluate = function evaluate(source) {
  try {
    var evalObject = eval(source);
    return evalObject ? evalObject : true;
  } catch (e) {
    (0, _errors.reportError)("Evaluation failed " + e.message);
    return false;
  }
};
exports.evaluate = evaluate;
var _default = {
  evaluate: evaluate
};
exports["default"] = _default;
//# sourceMappingURL=evaluate.js.map