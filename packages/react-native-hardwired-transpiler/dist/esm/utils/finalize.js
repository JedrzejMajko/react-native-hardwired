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
const dependencies = require('./dependencies');
const transformCode = code => {
  return code.substring('__d('.length, code.length - 2);
};

/**
 * Transform transpiled metro code into a stringified, hardwired json
 * @param transpiled
 * @param cliOptions
 * @param entryFile
 * @param deps
 * @returns {Promise<string|void>}
 */
module.exports = async (transpiled, cliOptions, entryFile, deps) => {
  const dependencyList = dependencies(transpiled.dependencies, entryFile, deps, cliOptions);
  let code = transformCode(transpiled.output[0].data.code);
  const finalForm = JSON.stringify(JSON.parse(JSON.stringify({
    code: code,
    dependencies: dependencyList
  })));
  if (cliOptions.outputFile) {
    return fs.writeFileSync(cliOptions.outputFile, finalForm);
  }
  return finalForm;
};
//# sourceMappingURL=finalize.js.map