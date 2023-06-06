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

const Module = require("module");
const path = require("path");
const fs = require("fs");
const cli = require("./cli.js");
const { moduleLoader } = require("./moduleLoader.js");

const mainPath = path.dirname(__filename).toString() + "/../../../";

const exportMap = function (map) {
  map["react-native-hardwired-map-file"] = [];
  return map;
};

const modulesMap = {};
Module._load = moduleLoader(mainPath, modulesMap);

module.exports = async (options) => {
  const finalOptions = {
    platform: options.dominantPlatform || "android",
    entryFile: options.entryFile || "index.js",
    mainPath: mainPath,
  };

  try {
    await cli(finalOptions);
  } catch (e) {
    if (e.code !== "ERR_INVALID_ARG_TYPE") {
      console.log("Hardwired", e);
    }
  } finally {
    const mapExportedArray = exportMap(modulesMap);
    fs.writeFileSync(options.outputMapFile, JSON.stringify(mapExportedArray));
    console.log(
      "Hardwired",
      "Map written to",
      options.outputMapFile,
      "with " + mapExportedArray.keys().length + " entries"
    );
    process.exit(0);
  }
};
