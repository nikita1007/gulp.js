const { src, dest } = require("gulp");

// Config
const paths = require("../config/paths");
const config = require("../config/configs");

// Plugins
const uglify = require("gulp-uglify-es").default;
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const webpack = require("webpack-stream");

module.exports = function build_js() {
  return new Promise((resolve) => {
    src(paths.js.build.src)
      .pipe(uglify())
      .pipe(babel(config.js.babel))
      .pipe(webpack(config.js.webpack))
      .pipe(concat(config.js.concat))
      .pipe(dest(paths.js.build.dist))
      .on("finish", resolve);
  });
};
