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

const path = require("path");
const Module = require("module");

const originalLoader = Module._load;
const extendedGetResolveDependencyFn = function (
  getResolveDependencyFn,
  mainPath,
  modulesMap
) {
  return async function (bundler, platform, resolverOptions) {
    const resolveFn = await getResolveDependencyFn(
      bundler,
      platform,
      resolverOptions
    );

    return (from, to) => {
      const resolved = resolveFn(from, to);
      const xpathResolved = path.relative(mainPath, resolved);
      const fromResolved = path.dirname(path.relative(mainPath, from));
      const xpathTo = path.relative(mainPath, to);
      const uniqueKey = xpathTo;

      if (typeof modulesMap[uniqueKey] === "undefined") {
        modulesMap[uniqueKey] = [];
      }

      if (
        !modulesMap[uniqueKey].find(
          (item) =>
            item.from === fromResolved &&
            item.to === xpathResolved &&
            item.platform === platform
        )
      ) {
        modulesMap[uniqueKey].push({
          from: fromResolved,
          to: xpathResolved,
          using: xpathTo,
          platform: platform,
        });
      }

      return resolved;
    };
  };
};

const moduleLoader = function (mainPath, modulesMap) {
  return function (request, parent) {
    const original = originalLoader(request, parent);
    if (
      typeof request === "string" &&
      request.match("/lib/transformHelpers") &&
      parent &&
      parent.id.match("/metro/")
    ) {
      const getResolveDependencyFn = original.getResolveDependencyFn;
      const result = {};
      for (let i in original) {
        if (i === "getResolveDependencyFn") {
          result[i] = extendedGetResolveDependencyFn(
            getResolveDependencyFn,
            mainPath,
            modulesMap
          );
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
  moduleLoader,
};
