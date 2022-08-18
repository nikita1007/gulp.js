const { src, dest } = require("gulp");

// Config
const paths = require("../config/paths");
const config = require("../config/configs");

// Plugins
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const svgmin = require("gulp-svgmin");
const svgCss = require("gulp-svg-css-pseudo");

module.exports = function svg() {
  return new Promise((resolve) => {
    return src(paths.svg.src)
      .pipe(
        plumber({
          errorHandler: notify.onError((error) => ({
            title: "SVG",
            message: error.message,
          })),
        })
      )
      .pipe(svgmin(config.svg.svgmin))
      .pipe(svgCss(config.svg.svgCss))
      .pipe(dest(paths.svg.dist))
      .on("finish", resolve);
  });
};
