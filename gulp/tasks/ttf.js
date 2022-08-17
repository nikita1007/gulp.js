const { src, dest } = require("gulp");

// Config
const paths = require("../config/paths");
const config = require("../config/configs");

// Plugins
const changed = require("gulp-changed");
const ttf2woff2 = require("gulp-ttftowoff2");
const ttf2woff = require("gulp-ttf2woff");

module.exports = function ttf(done) {
  return new Promise(async (resolve) => {
    src(paths.ttf.src)
      .pipe(changed(paths.ttf.dist, config.ttf.changed.woff2))
      .pipe(ttf2woff2())
      .pipe(dest(paths.ttf.dist));
    src(paths.ttf.src)
      .pipe(changed(paths.ttf.dist, config.ttf.changed.woff))
      .pipe(ttf2woff())
      .pipe(dest(paths.ttf.dist))
      .on("finish", resolve);
  });
};
