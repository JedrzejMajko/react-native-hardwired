const path = require('path');

/**
 * Foolishly assume that mainPath is two levels above you in node_modules
 * @type {string}
 */
const getMainPath = () => {
  const dir = path.dirname(__filename).toString();
  if (dir.substring(dir.length - 3, dir.length) === 'src') {
    return dir + '/../';
  }

  return dir + '/../../';
};
module.exports = getMainPath;
