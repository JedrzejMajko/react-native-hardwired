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
import { hashingAlgorithm } from "../utils";

/**
 * Creates a module ID based on its name.
 * It should be always unique.
 * Please note that RN returns strings on __DEV__ mode and numbers on prod.
 * Here, we return only numbers on both dev and prod.
 * This method is intended to be used in metro.config.js ES6 environment.
 * In your metro.config.js, you can use it like this:
 *   serializer: {
 *     createModuleIdFactory: createModuleIdFactory,
 *   },
 * @param packPath
 * @returns {function(string): number}
 */
export const createModuleIdFactory = () => packPath => {
  return hashingAlgorithm(packPath);
};
export default {
  createModuleIdFactoryRN: createModuleIdFactory
};
//# sourceMappingURL=createModuleIdFactoryRN.js.map