const { src, dest } = require("gulp");

// Config
const paths = require("../config/paths");
const config = require("../config/configs");

// Plugins
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const sass = require("gulp-sass")(require("sass"));
const prefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const groupCssMediaQueries = require("gulp-group-css-media-queries");
const map = require("gulp-sourcemaps");
const bulk = require("gulp-sass-bulk-importer");
const webpCss = require("gulp-webp-css");
const clean = require("gulp-clean-css");
const concat = require("gulp-concat");

module.exports = function styles() {
  return new Promise((resolve) => {
    src(paths.styles.src)
      .pipe(
        plumber({
          errorHandler: notify.onError((error) => ({
            title: "SCSS",
            message: error.message,
          })),
        })
      )
      .pipe(map.init())
      .pipe(bulk())
      .pipe(sass(config.styles.sass))
      .pipe(webpCss())
      .pipe(prefixer(config.styles.prefixer))
      .pipe(clean(config.styles.clean))
      .pipe(groupCssMediaQueries())
      .pipe(concat(config.styles.concat.main))
      .pipe(map.write("../sourcemaps/"))
      .pipe(dest(paths.styles.dist))
      .pipe(csso())
      .pipe(concat(config.styles.concat.min))
      .pipe(map.write("../sourcemaps/"))
      .pipe(dest(paths.styles.dist))
      .on("finish", resolve);
  });
};
