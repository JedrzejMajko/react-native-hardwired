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
const path = require('path');
const Module = require('module');
const originalLoader = Module._load;

/**
 * Extends metro's getResolveDependencyFn to add a custom resolver.
 * @param getResolveDependencyFn
 * @param options
 * @param map
 * @returns {function(*, *, *): Promise<function(*, *): (number | string | ((value: any, helpers: Joi.CustomHelpers) => any))>}
 */
const extendedGetResolveDependencyFn = function (getResolveDependencyFn, options, map) {
  const mainPath = options.mainPath;
  return async function (bundler, platform, resolverOptions) {
    const resolveFn = await getResolveDependencyFn(bundler, platform, resolverOptions);
    return (from, to) => {
      console.log('CALL');
      const xpathTo = path.relative(mainPath, to);
      if (typeof map[xpathTo] === 'object' && map[xpathTo] !== null && map[xpathTo].length > 0) {
        return map[xpathTo][0];
      } else {
        console.error('Hardwired: Cannot find path to module in map (', xpathTo, ').');
      }
      return resolveFn(from, to);
    };
  };
};

/**
 * Intercept metro's transformHelpers module and extends it with our custom resolver.
 * @param map
 * @param options
 * @returns {(function(*, *): ({}))|*}
 */
const moduleLoader = function (map, options) {
  return function (request, parent) {
    const original = originalLoader(request, parent);
    if (typeof request === 'string' && request.match('lib/transformHelpers') && parent && parent.id.match(/\/transpile\.js$/)) {
      const getResolveDependencyFn = original.getResolveDependencyFn;
      const result = {};
      /**
       * Implicitly extend the original getResolveDependencyFn with our custom resolver.
       * Use shallow copy to avoid modifying the original object.
       */
      for (let i in original) {
        if (i === 'getResolveDependencyFn') {
          result[i] = extendedGetResolveDependencyFn(getResolveDependencyFn, options, map);
          continue;
        }
        result[i] = original[i];
      }
      return result;
    }
    return original;
  };
};
module.exports = {
  extendedGetResolveDependencyFn,
  moduleLoader
};
//# sourceMappingURL=moduleLoader.js.map