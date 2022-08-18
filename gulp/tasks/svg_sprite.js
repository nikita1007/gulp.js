const { src, dest } = require("gulp");

// Config
const paths = require("../config/paths");
const config = require("../config/configs");

// Plugins
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const svgmin = require("gulp-svgmin");
const sprite = require("gulp-svg-sprite");
const cheerio = require("gulp-cheerio");
const replace = require("gulp-replace");

module.exports = function svg_sprite() {
  return new Promise((resolve) => {
    return src(paths.svg_sprite.src)
      .pipe(
        plumber({
          errorHandler: notify.onError((error) => ({
            title: "SVG Sprite",
            message: error.message,
          })),
        })
      )
      .pipe(svgmin(config.svg_sprite.svgmin))
      .pipe(
        cheerio({
          run: function ($) {
            $("[fill]").removeAttr("fill");
            $("[style]").removeAttr("style");
          },
          parserOptions: { xmlMode: true },
        })
      )
      .pipe(replace("&gt;", ">"))
      .pipe(sprite(config.svg_sprite.sprite))
      .on("error", function (error) {
        console.log(error);
      })
      .pipe(dest(paths.svg_sprite.dist))
      .on("finish", resolve);
  });
};
