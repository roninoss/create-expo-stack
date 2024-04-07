"use strict";

/**
 * isWin
 * Check if the machine is running Windows or not.
 *
 * @name isWin
 * @function
 * @return {Boolean} `true`, if the platform is Windows, `false` otherwise.
 */

module.exports = function isWin() {
  return process.platform === "win32";
};