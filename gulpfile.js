const { src, dest, watch, series, parallel } = require("gulp");

const htmlmin = require("gulp-htmlmin");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const del = require("del");
const gulpif = require("gulp-if");
const sprite = require("gulp-svg-sprite");
const image = require("gulp-image");
const babel = require("gulp-babel");
const notify = require("gulp-notify");
const uglify = require("gulp-uglify-es").default;
const sass = require("gulp-sass")(require("sass"));
const gcmq = require("gulp-group-css-media-queries");
const isProd = process.argv.includes("prod");
const isDev = !isProd;

const html = () => {
  return src("./src/*.html")
    .pipe(
      gulpif(
        isProd,
        htmlmin({
          collapseWhitespace: true,
        })
      )
    )
    .pipe(gulpif(isProd, dest("./build")))
    .pipe(gulpif(isDev, dest("./docs")))
    .pipe(browserSync.stream());
};

const styles = () => {
  return src("./src/scss/main.scss")
    .pipe(gulpif(isDev, sourcemaps.init(undefined)))
    .pipe(sass())
    .pipe(concat("style.css"))
    .pipe(autoprefixer({ overrideBrowserslist: ["last 5 versions"] }))
    .pipe(gcmq())
    .pipe(gulpif(isProd, cleancss({ level: 1 })))
    .on(
      "error",
      notify.onError({
        title: "Minification error",
        message: "Error: <%= error.message %>",
      })
    )
    .pipe(gulpif(isDev, sourcemaps.write(undefined, undefined)))
    .pipe(gulpif(isDev, dest("./docs/css")))
    .pipe(gulpif(isProd, dest("./build/css")))
    .pipe(browserSync.stream());
};

const svgSprites = () => {
  let config = {
    shape: {
      dimension: {
        maxWidth: 500,
        maxHeight: 500,
      },
      spacing: {
        padding: 0,
      },
      transform: [
        {
          svgo: {
            plugins: [
              { removeViewBox: false },
              { removeUnusedNS: false },
              { removeUselessStrokeAndFill: true },
              { cleanupIDs: false },
              { removeComments: true },
              { removeEmptyAttrs: true },
              { removeEmptyText: true },
              { collapseGroups: true },
              { removeAttrs: { attrs: "(fill|stroke|style)" } },
            ],
          },
        },
      ],
    },
    mode: {
      symbol: {
        dest: ".",
        sprite: "sprite.svg",
      },
    },
  };
  return src("src/assets/img/svg/**/*.svg")
    .pipe(sprite(config)).on('error', function(error){ console.log(error); })
    .pipe(gulpif(isDev, dest("./docs/assets/img")))
    .pipe(gulpif(isProd, dest("./build/assets/img")));
};

const images = () => {
  return src([
    "./src/assets/img/**/*.jpg",
    "./src/assets/img/**/*.jpeg",
    "./src/assets/img/**/*.png",
    "./src/assets/img/**/*.svg",
  ])
    .pipe(gulpif(isDev, dest("./docs/assets/img")))
    .pipe(gulpif(isProd, image()))
    .pipe(gulpif(isProd, dest("./build/assets/img")))
    .pipe(browserSync.stream());
};

const scripts = () => {
  return src(["src/js/modules/**/*.js", "src/js/main.js"])
    .pipe(gulpif(isDev, sourcemaps.init()))
    .pipe(concat("main.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulpif(isDev, sourcemaps.write()))
    .pipe(dest("./docs/js"))
    .pipe(gulpif(isProd, uglify().on("error", notify.onError())))
    .pipe(gulpif(isProd, dest("./build/js")))
    .pipe(browserSync.stream());
};

const resources = () => {
  return src("./src/assets/**/*")
    .pipe(gulpif(isDev, dest("./docs/assets")))
    .pipe(gulpif(isProd, dest("./build/assets")));
};

// const favicon = () => {
//   return src('./src/favicon.ico')
//     .pipe(gulpif(isDev, dest('./docs')))
//     .pipe(gulpif(isProd, dest('./build')))
// }

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "./docs",
    },
  });
  watch("./src/*.html", html);
  watch("./src/scss/**/*.scss", styles);
  watch("./src/assets/img/**/*", images);
  watch("./src/assets/img/svg/**/*.svg", svgSprites);
  watch("./src/js/**/*.js", scripts);
  watch("./src/lib/**", resources);
};

const clean = () => del(["./build"]);

exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.svgSprites = svgSprites;
exports.images = images;
exports.scripts = scripts;
exports.resources = resources;
// exports.favicon      = favicon;
// exports.webmanifest  = webmanifest;

exports.dev = parallel(
  html,
  styles,
  images,
  scripts,
  svgSprites,
  resources,
  watchFiles
);
exports.prod = series(
  clean,
  html,
  styles,
  images,
  scripts,
  resources,
  svgSprites
);
