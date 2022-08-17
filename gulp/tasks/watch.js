const browserSync = require("browser-sync").create();
const { watch, parallel, series } = require("gulp");

// Config
const paths = require("../config/paths");

module.exports = function watching() {
  return new Promise(async (resolve) => {
    await browserSync.init({
      server: {
        baseDir: "dist/",
      },
    });
    watch(paths.html.watch, parallel("html")).on("change", browserSync.reload);
    watch(paths.styles.watch, parallel("styles")).on(
      "change",
      browserSync.reload
    );
    watch(paths.js.dev.watch, parallel("dev_js")).on(
      "change",
      browserSync.reload
    );
    watch(paths.rastr.watch, parallel("rastr")).on("all", browserSync.reload);
    watch(paths.webp.watch, parallel("webp")).on("all", browserSync.reload);
    watch(paths.ttf.watch, series("ttf", "fonts")).on(
      "all",
      browserSync.reload
    );
    resolve();
  });
};
