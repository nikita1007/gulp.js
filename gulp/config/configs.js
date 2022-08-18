require("dotenv").config();

module.exports = {
  html: {
    htmlmin: {
      collapseWhitespace: true,
    },
  },
  styles: {
    prefixer: {
      overrideBrowserslist: ["last 8 versions"],
      browsers: [
        "Android >= 4",
        "Chrome >= 20",
        "Firefox >= 24",
        "Explorer >= 11",
        "iOS >= 6",
        "Opera >= 12",
        "Safari >= 6",
      ],
    },
    sass: {
      outputStyle: "compressed",
    },
    clean: {
      level: 2,
    },
    concat: {
      main: "style.css",
      min: "style.min.css",
    },
  },
  js: {
    webpack: {
      mode: process.env.APP_MODE === "dev" ? "development" : "production",
      /*
       *  production - code will transmit in .min format
       *  development - code will transmit in not .min format
       */
    },
    concat: "main.min.js",
    babel: {
      presets: ["@babel/env"],
    },
  },
  webp: {
    changed: {
      extension: ".webp",
    },
  },
  ttf: {
    changed: {
      woff2: () => {
        return {
          extension: ".woff2",
          hasChanged: changed.compareLastModifiedTime,
        };
      },
      woff: () => {
        return {
          extension: ".woff",
          hasChanged: changed.compareLastModifiedTime,
        };
      },
    },
  },
  svg: {
    svgmin: {
      multipass: true,
      js2svg: {
        pretty: true,
      },
      plugins: [
        {
          removeComments: true,
        },
        {
          removeEmptyContainers: true,
        },
      ],
    },
    svgCss: {
      fileName: "_svg",
      fileExt: "scss",
      cssPrefix: "--svg__",
      addSize: false,
    },
  },
  svg_sprite: {
    svgmin: {
      multipass: true,
      js2svg: {
        pretty: true,
      },
      plugins: [
        {
          removeComments: true,
        },
        {
          removeEmptyContainers: true,
        },
      ],
    },
    sprite: {
      mode: {
        stack: {
          sprite: "../sprite.svg",
        },
      },
    },
  },
};
