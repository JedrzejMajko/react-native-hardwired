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
 * Suppressor allows me to suppress the ErrorUtils.reportFatalError method for blindly loading dependency modules.
 * This is a workaround for the fact that the ErrorUtils.reportFatalError method will throw error regardless of what you do.
 */

/**
 * Custom handler for Fatal Errors for ErrorUtils.reportFatalError
 * Intercepts errors thrown by unknown dependencies during loadDependencies
 * @param error
 */
export let customErrorUtilMethod;
export const customErrorUtilContainer = oldCallback => {
  return customErrorUtilMethod = function (error) {
    if (oldCallback && typeof oldCallback === "function" && error && error.length > 0 && !error[0].match(/Requiring unknown module/)) {
      return oldCallback(...arguments);
    }
  };
};

/**
 * Suppress the ErrorUtils.reportFatalError method for blindly loading dependency modules.
 * Use reinstateErrorUtils to roll it back.
 */
export const suppressErrorUtils = function () {
  if (typeof global["ErrorUtils"] !== "undefined") {
    const utilsMethod = global["ErrorUtils"].reportFatalError;
    global["ErrorUtils"].reportFatalError = customErrorUtilContainer(utilsMethod);
    if (utilsMethod !== customErrorUtilMethod) {
      return utilsMethod;
    }
  }
  return null;
};

/**
 * Reinstate previous ErrorUtils.reportFatalError method.
 * @param utilsMethod
 */
export const reinstateErrorUtils = function (utilsMethod) {
  if (typeof global["ErrorUtils"] !== "undefined" && global["ErrorUtils"].reportFatalError === customErrorUtilMethod) {
    global["ErrorUtils"].reportFatalError = utilsMethod;
  }
};

/**
 * Callback setup for suppressErrorUtils.
 * It'll initialize the suppressor, run the callback and reinstate original ErrorUtils.
 * @param callback function to run
 */
export const errorUtilsContextSwap = async callback => {
  const utilsMethodSuppressed = suppressErrorUtils();
  let result = false;
  try {
    result = await callback();
  } catch (e) {}
  reinstateErrorUtils(utilsMethodSuppressed);
  return result;
};
export default {
  errorUtilsContextSwap,
  reinstateErrorUtils,
  suppressErrorUtils
};
//# sourceMappingURL=errorUtilsContextSwap.js.map