// Config
const paths = require("../config/paths");

// Plugins
const del = require("del");
const gulp = require("gulp");

module.exports = function clear() {
  return new Promise(async (resolve) => {
    await del(paths.dest);
    resolve();
  });
};
