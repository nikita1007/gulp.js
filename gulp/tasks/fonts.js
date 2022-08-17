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

module.exports = function fonts() {
  return new Promise(async (resolve, reject) => {
    await fs.writeFile(srcFonts, "", () => {});
    await fs.readdir(appFonts, (err, items) => {
      if (items) {
        items.forEach((item) => {
          if (fs.lstatSync(`${appFonts}${item}`).isDirectory()) {
            fs.readdir(`${appFonts}${item}`, (err, items) => {
              if (items) {
                let c_fontname;
                items.forEach((item) => {
                  let fontname = item.split("."),
                    fontExt;
                  fontExt = fontname[1];
                  fontname = fontname[0];

                  let fontWeight, fontStyle;
                  if (c_fontname != fontname) {
                    if (fontExt == "woff" || fontExt == "woff2") {
                      for (var key in fontWeights) {
                        if (
                          fontname.toLowerCase().indexOf(key.toLowerCase()) !==
                          -1
                        ) {
                          fontWeight = fontWeights[key];
                        }
                      }
                      fontStyle =
                        fontname.toLowerCase().indexOf("italic") !== -1
                          ? "italic"
                          : undefined;

                      if (fontWeight && fontStyle) {
                        fs.appendFile(
                          srcFonts,
                          `@include font-face("${fontname}", "${fontname}", ${fontWeight}, "${fontStyle}");\r\n`,
                          () => {}
                        );
                      } else if (!fontWeight && fontStyle) {
                        fs.appendFile(
                          srcFonts,
                          `@include font-face("${fontname}", "${fontname}", 400, "${fontStyle}");\r\n`,
                          () => {}
                        );
                      } else if (fontWeight && !fontStyle) {
                        fs.appendFile(
                          srcFonts,
                          `@include font-face("${fontname}", "${fontname}", ${fontWeight});\r\n`,
                          () => {}
                        );
                      } else {
                        fs.appendFile(
                          srcFonts,
                          `@include font-face("${fontname}", "${fontname}", 400);\r\n`,
                          () => {}
                        );
                      }

                      console.log(`
                      Added new font: ${fontname}.
                      ----------------------------------------------------------------------------------
                      Please, move mixin call from 'src/scss/_local-fonts.scss' to 'src/scss/_fonts.scss' and then change it!
                      ----------------------------------------------------------------------------------
                      `);
                    }
                  }
                  c_fontname = fontname;
                });
              }
            });
          } else {
            fs.readdir(`${appFonts}`, (err, items) => {
              if (items) {
                let c_fontname;
                items.forEach((item) => {
                  let fontname = item.split("."),
                    fontExt;
                  fontExt = fontname[1];
                  fontname = fontname[0];

                  let fontWeight, fontStyle;
                  if (c_fontname != fontname) {
                    if (fontExt == "woff" || fontExt == "woff2") {
                      for (var key in fontWeights) {
                        if (
                          fontname.toLowerCase().indexOf(key.toLowerCase()) !==
                          -1
                        ) {
                          fontWeight = fontWeights[key];
                        }
                      }
                      fontStyle =
                        fontname.toLowerCase().indexOf("italic") !== -1
                          ? "italic"
                          : undefined;

                      if (fontWeight && fontStyle) {
                        fs.appendFile(
                          srcFonts,
                          `@include font-face("${fontname}", "${fontname}", ${fontWeight}, "${fontStyle}");\r\n`,
                          () => {}
                        );
                      } else if (!fontWeight && fontStyle) {
                        fs.appendFile(
                          srcFonts,
                          `@include font-face("${fontname}", "${fontname}", 400, "${fontStyle}");\r\n`,
                          () => {}
                        );
                      } else if (fontWeight && !fontStyle) {
                        fs.appendFile(
                          srcFonts,
                          `@include font-face("${fontname}", "${fontname}", ${fontWeight});\r\n`,
                          () => {}
                        );
                      } else {
                        fs.appendFile(
                          srcFonts,
                          `@include font-face("${fontname}", "${fontname}", 400);\r\n`,
                          () => {}
                        );
                      }

                      console.log(`
                      Added new font: ${fontname}.
                      ----------------------------------------------------------------------------------
                      Please, move mixin call from 'src/scss/_local-fonts.scss' to 'src/scss/_fonts.scss' and then change it!
                      ----------------------------------------------------------------------------------
                      `);
                    }
                  }
                  c_fontname = fontname;
                });
              }
            });
          }
        });
      }
    });
    resolve();
  });
};
