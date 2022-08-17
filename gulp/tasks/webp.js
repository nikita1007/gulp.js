const { src } = require("gulp");

// Config
const paths = require("../config/paths");
const config = require("../config/configs");

// Plugins
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const webpConv = require("gulp-webp");
const changed = require("gulp-changed");
const multiDest = require("gulp-multi-dest");

module.exports = function webp() {
  return new Promise((resolve) => {
    src(paths.webp.src)
      .pipe(
        plumber({
          errorHandler: notify.onError((error) => ({
            title: "Images Webp",
            message: error.message,
          })),
        })
      )
      .pipe(changed(paths.webp.dist, config.webp.changed))
      .pipe(webpConv())
      .pipe(multiDest([paths.webp.srcDist, paths.webp.dist]))
      .on("finish", resolve);
  });
};
