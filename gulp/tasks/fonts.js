// Config
const paths = require("../config/paths");
const config = require("../config/configs");

// Plugins
const fs = require("fs");

let srcFonts = paths.fonts.srcFonts;
let appFonts = paths.fonts.dist;

let fontWeights = {
  Thin: "100",
  ExtraLight: "200",
  Light: "300",
  Regular: "400",
  Medium: "500",
  SemiBold: "600",
  Bold: "700",
  ExtraBold: "800",
  Black: "900",
};

function addFont(dir = null, font_items) {
  let c_fontname;
  let fontName;
  font_items.forEach((font) => {
    let fontname = font.split("."),
      fontExt,
      fontWeight,
      fontStyle;
    fontExt = fontname[1];
    fontFileName = fontname[0];
    fontWeight = fontFileName.split("-")[1];
    fontName = fontFileName
      .split("-")[0]
      .replace(fontFileName[0], fontFileName[0].toUpperCase());

    if (c_fontname != fontFileName) {
      if (fontExt == "woff" || fontExt == "woff2") {
        for (var key in fontWeights) {
          if (fontWeight.toLowerCase() === key.toLowerCase()) {
            fontWeight = fontWeights[key];
          }
        }
        fontStyle =
          fontFileName.toLowerCase().indexOf("italic") !== -1
            ? "italic"
            : undefined;

        if (dir) {
          if (fontWeight && fontStyle) {
            fs.appendFile(
              srcFonts,
              `@include font-face("${fontName}", "${dir}/${fontFileName}", ${fontWeight}, "${fontStyle}");\r\n`,
              () => {}
            );
          } else if (!fontWeight && fontStyle) {
            fs.appendFile(
              srcFonts,
              `@include font-face("${fontName}", "${dir}/${fontFileName}", 400, "${fontStyle}");\r\n`,
              () => {}
            );
          } else if (fontWeight && !fontStyle) {
            fs.appendFile(
              srcFonts,
              `@include font-face("${fontName}", "${dir}/${fontFileName}", ${fontWeight});\r\n`,
              () => {}
            );
          } else {
            fs.appendFile(
              srcFonts,
              `@include font-face("${fontName}", "${dir}/${fontFileName}", 400);\r\n`,
              () => {}
            );
          }
        } else {
          if (fontWeight && fontStyle) {
            fs.appendFile(
              srcFonts,
              `@include font-face("${fontName}", "${fontFileName}", ${fontWeight}, "${fontStyle}");\r\n`,
              () => {}
            );
          } else if (!fontWeight && fontStyle) {
            fs.appendFile(
              srcFonts,
              `@include font-face("${fontName}", "${fontFileName}", 400, "${fontStyle}");\r\n`,
              () => {}
            );
          } else if (fontWeight && !fontStyle) {
            fs.appendFile(
              srcFonts,
              `@include font-face("${fontName}", "${fontFileName}", ${fontWeight});\r\n`,
              () => {}
            );
          } else {
            fs.appendFile(
              srcFonts,
              `@include font-face("${fontName}", "${fontFileName}", 400);\r\n`,
              () => {}
            );
          }
        }

        console.log(`
        Added new font: ${fontFileName}.
        ----------------------------------------------------------------------------------
        Please, move mixin call from 'src/scss/_local-fonts.scss' to 'src/scss/_fonts.scss' and then change it!
        ----------------------------------------------------------------------------------
        `);
      }
    }
    c_fontname = fontFileName;
  });
}

module.exports = function fonts() {
  return new Promise(async (resolve, reject) => {
    await fs.writeFile(srcFonts, "", () => {});
    fs.appendFile(srcFonts, `@import 'mixins';\r\n`, () => {});

    await fs.readdir(appFonts, (err, dirs) => {
      if (dirs) {
        dirs.forEach((dir) => {
          if (fs.lstatSync(`${appFonts}${dir}`).isDirectory()) {
            fs.readdir(`${appFonts}${dir}`, (err, items) => {
              if (items) {
                addFont(dir, items);
              }
            });
          } else {
            fs.readdir(`${appFonts}`, (err, items) => {
              if (items) {
                addFont(items);
              }
            });
          }
        });
      }
    });
    resolve();
  });
};
