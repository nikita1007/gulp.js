const { src, dest } = require("gulp");

// Config
const paths = require("../config/paths");
const config = require("../config/configs");

// Plugins
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const uglify = require("gulp-uglify-es").default;
const concat = require("gulp-concat");
const map = require("gulp-sourcemaps");
const webpack = require("webpack-stream");
const bs = require("browser-sync");

module.exports = function dev_js() {
  return new Promise((resolve) => {
    src(paths.js.dev.src)
      .pipe(
        plumber({
          errorHandler: notify.onError((error) => ({
            title: "JavaScript",
            message: error.message,
          })),
        })
      )
      .pipe(map.init())
      .pipe(uglify())
      .pipe(webpack(config.js.webpack))
      .pipe(concat(config.js.concat))
      .pipe(map.write("../sourcemaps"))
      .pipe(dest(paths.js.dev.dist))
      .pipe(bs.stream())
      .on("finish", resolve);
  });
};
