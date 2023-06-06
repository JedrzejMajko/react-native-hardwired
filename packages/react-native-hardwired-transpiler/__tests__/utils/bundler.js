/*
 * Hardwired Copyright (c) 2023 Jędrzej Majko (jdrzjm@gmail.com)
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

const bundler = require('../../src/utils/bundler');

jest.setTimeout(60000);
jest.mock(
  './dist/lib/utils/createModuleIdFactoryNode.js',
  () => {
    return (name) => {
      return 1;
    };
  },
  { virtual: true }
);

describe('Bundler creation', () => {
  it('async creation', () => {
    return new Promise(async (approve) => {
      const mainPath = 'test';

      const result = await bundler({}, mainPath);

      expect(result).toBeTruthy();
      expect(result._bundler).toBeTruthy();
      expect(result._deltaBundler).toBeTruthy();
      expect(result.config).toBeTruthy();

      // allow it to setup itself
      setTimeout(() => {
        approve();
      }, 1000);
    });
  });
});
