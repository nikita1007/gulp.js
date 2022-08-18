const gulp = require("gulp");

const requireDir = require("require-dir");
const tasks = requireDir("./gulp/tasks");

// Tests
exports.paths = (done) => {
  console.log(require("./gulp/config/paths"));
  done();
};

// Tasks
exports.clear = tasks.clear;
exports.html = tasks.html;
exports.styles = tasks.styles;
exports.dev_js = tasks.dev_js;
exports.build_js = tasks.build_js;
exports.rastr = tasks.rastr;
exports.webp = tasks.webp;
exports.svg = tasks.svg;
exports.svg_sprite = tasks.svg_sprite;
exports.webp = tasks.webp;
exports.ttf = tasks.ttf;
exports.fonts = tasks.fonts;
exports.browserSync = tasks.browser_sync;
exports.watch = tasks.watch;

async function dflt() {
  await tasks.clear();
  await console.log("clear");
  await tasks.rastr();
  await console.log("rastr");
  await tasks.svg();
  await console.log("svg");
  await tasks.svg_sprite();
  await console.log("svg_sprite");
  await tasks.webp();
  await console.log("webp");
  await tasks.ttf();
  await console.log("ttf");
  await tasks.fonts();
  await console.log("fonts");
  await tasks.dev_js();
  await console.log("dev_js");
  await tasks.styles();
  await console.log("styles");
  await tasks.html();
  await console.log("html");
  // await tasks.browser_sync();
  // await console.log("browser_sync");
  await tasks.watch();
  await console.log("watch");
}

// Прежде чем использовать скрипт build, поменяйте переменные среды "APP_MODE"
async function build() {
  await tasks.clear();
  await console.log("clear");
  await tasks.rastr();
  await console.log("rastr");
  await tasks.svg();
  await console.log("svg");
  await tasks.svg_sprite();
  await console.log("svg_sprite");
  await tasks.webp();
  await tasks.webp();
  await console.log("webp");
  await tasks.ttf();
  await console.log("ttf");
  await tasks.fonts();
  await console.log("fonts");
  await tasks.build_js();
  await console.log("build_js");
  await tasks.styles();
  await console.log("styles");
  await tasks.html();
  await console.log("html");
}

exports.default = dflt;

exports.build = build;
