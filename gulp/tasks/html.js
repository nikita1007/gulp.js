const { src, dest } = require("gulp");

// Config
const paths = require("../config/paths");
const config = require("../config/configs");

// Plugins
const htmlmin = require("gulp-htmlmin");
const webpHtml = require("gulp-webp-html");
const include = require("gulp-file-include");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const bs = require("browser-sync");

module.exports = function html() {
  return new Promise((resolve) => {
    src(paths.html.src)
      .pipe(
        plumber({
          errorHandler: notify.onError((error) => ({
            title: "HTML",
            message: error.message,
          })),
        })
      )
      .pipe(include())
      .pipe(webpHtml())
      .pipe(htmlmin(config.html.htmlmin))
      .pipe(dest(paths.html.dist))
      .pipe(bs.stream())
      .on("finish", resolve);
  });
};
