const { src, dest } = require("gulp");

// Config
const paths = require("../config/paths");
const config = require("../config/configs");

// Plugins
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const changed = require("gulp-changed");
const imagemin = require("gulp-imagemin");
const recompress = require("imagemin-jpeg-recompress");
const pngquant = require("imagemin-pngquant");
const bs = require("browser-sync");

module.exports = function rastr() {
  return new Promise((resolve) => {
    src(paths.rastr.src)
      .pipe(
        plumber({
          errorHandler: notify.onError((error) => ({
            title: "Images Rastr",
            message: error.message,
          })),
        })
      )
      .pipe(changed(paths.rastr.dist))
      .pipe(
        imagemin(
          {
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
          },
          [
            recompress({
              loops: 6,
              min: 50,
              max: 90,
              quality: "high",
              use: [
                pngquant({
                  quality: [0.8, 1],
                  strip: true,
                  speed: 1,
                }),
              ],
            }),
            imagemin.gifsicle(),
            imagemin.optipng(),
            imagemin.svgo(),
          ]
        )
      )
      .pipe(dest(paths.rastr.dist))
      .pipe(bs.stream())
      .on("finish", resolve);
  });
};
