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

import { errorUtilsContextSwap } from "./errorUtilsContextSwap";
import { reportError } from "../errors";

/**
 * Loads dependencies, tries to load them and returns array of valid, loaded dependency hashes.
 * @param dependencies
 * @param config
 */
export const loadDependencies = async (dependencies, config) => {
  let dependencyIds = [];
  let result = await errorUtilsContextSwap(() => {
    let depCount = dependencies.length;
    let loadedHashCount = 0;
    for (let i = 0; i < depCount; i++) {
      const dependency = dependencies[i];
      if (dependency.hashes) {
        let lib;
        for (let e = 0; e < dependency.hashes.length; e++) {
          const hash = dependency.hashes[e];
          try {
            lib = config.runModuleStatement(hash);
            if (lib) {
              loadedHashCount++;
              dependencyIds.push(hash);
              break;
            }
          } catch (error) {
            reportError("Ignoring bad dependency hash " + hash);
          }
        }
      }
    }
    if (depCount !== loadedHashCount) {
      reportError("Not all dependencies loaded " + depCount + " from " + loadedHashCount);
      return false;
    }
    return true;
  });

  /*if (!result) {
    reportError("Cannot load dependencies");
  }*/

  return result ? dependencyIds : [];
};
//# sourceMappingURL=loadDependencies.js.map