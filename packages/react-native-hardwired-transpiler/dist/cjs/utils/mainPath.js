"use strict";

var path = require('path');

/**
 * Foolishly assume that mainPath is two levels above you in node_modules
 * @type {string}
 */
var getMainPath = function getMainPath() {
  var dir = path.dirname(__filename).toString();
  if (dir.substring(dir.length - 3, dir.length) === 'src') {
    return dir + '/../';
  }
  return dir + '/../../';
};
module.exports = getMainPath;
//# sourceMappingURL=mainPath.js.map