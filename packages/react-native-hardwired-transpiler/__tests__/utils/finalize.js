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
const fs = require('fs');
const dependencies = require('../../src/utils/dependencies');
const transform = require('../../src/utils/finalize');

jest.mock('fs', () => ({
  writeFileSync: jest.fn(),
}));

jest.mock('../../src/utils/dependencies');

describe('transform', () => {
  it('should transform code and dependencies and return a stringified JSON', async () => {
    const transpiled = {
      dependencies: ['dep1', 'dep2'],
      output: [{ data: { code: '__d(transformedCode);' } }],
    };
    const cliOptions = {
      outputFile: null,
    };
    const entryFile = 'entryFile';
    const deps = (file, name) => ({
      to: 'toPath',
    });

    const mockDependencyList = ['dep1', 'dep2'];
    dependencies.mockReturnValue(mockDependencyList);

    const result = await transform(transpiled, cliOptions, entryFile, deps);

    expect(dependencies).toHaveBeenCalledWith(
      transpiled.dependencies,
      entryFile,
      deps,
      cliOptions
    );
    const expected = JSON.stringify({
      code: 'transformedCode',
      dependencies: mockDependencyList,
    });
    expect(result).toEqual(expected);
  });

  it('should write output to file if outputFile is provided', async () => {
    const transpiled = {
      dependencies: ['dep1', 'dep2'],
      output: [{ data: { code: '__d(transformedCode);' } }],
    };
    const cliOptions = {
      outputFile: 'outputFile',
    };
    const entryFile = 'entryFile';
    const deps = (file, name) => ({
      to: 'toPath',
    });

    const mockDependencyList = ['dep1', 'dep2'];
    dependencies.mockReturnValue(mockDependencyList);

    const result = await transform(transpiled, cliOptions, entryFile, deps);

    const expected = JSON.stringify({
      code: 'transformedCode',
      dependencies: mockDependencyList,
    });
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      cliOptions.outputFile,
      expected
    );
    expect(result).toBeUndefined(); // writeFileSync returns undefined
  });
});
