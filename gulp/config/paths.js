const src = "src",
  dest = "dist";

module.exports = {
  src,
  dest,
  html: {
    src: [`${src}/**/*.html`, `!${src}/components/**/*.html`],
    dist: `${dest}/`,
    watch: `${src}/**/*.html`,
  },
  styles: {
    src: `${src}/{sass,scss}/**/*.{sass,scss}`,
    dist: `${dest}/css/`,
    watch: `${src}/{sass,scss}/**/*.{sass,scss}`,
  },
  js: {
    dev: {
      src: `${src}/js/**/*.js`,
      dist: `${dest}/js/`,
      watch: `${src}/js/**/*.js`,
    },
    build: {
      src: `${src}/js/**/*.js`,
      dist: `${dest}/js/`,
    },
  },
  rastr: {
    src: `${src}/img/**/*.+(png|jpg|jpeg|gif|svg|ico)`,
    watch: `${src}/img/**/*.+(png|jpg|jpeg|gif|svg|ico)`,
    dist: `${dest}/img/`,
  },
  webp: {
    src: `${dest}/img/**/*.+(png|jpg|jpeg)`,
    watch: `${dest}/img/**/*.+(png|jpg|jpeg)`,
    dist: `${dest}/img/`,
    srcDist: `${src}/img/`,
  },
  ttf: {
    src: `${src}/fonts/**/*.ttf`,
    watch: `${src}/fonts/**/*.ttf`,
    dist: `${dest}/fonts/`,
  },
  fonts: {
    srcFonts: `${src}/scss/_local-fonts.scss`,
    dist: `${dest}/fonts/`,
  },
  svg: {
    src: `${src}/img/svg/**/*.svg`,
    dist: `${src}/scss/`,
    watch: `${src}/img/svg/**/*.svg`,
  },
  svg_sprite: {
    src: `${src}/img/svg/**/*.svg`,
    dist: `${dest}/img/svg/`,
    watch: `${src}/img/svg/**/*.svg`,
  },
};
