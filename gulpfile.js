"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require('gulp-csso');
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("imagemin-webp");
var extReplace = require("gulp-ext-replace");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var server = require("browser-sync").create();

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function() {
  return gulp.src("source/img/**/*/.{png, jpg, svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.mozjpeg({
      quality: 75,
      progressive: true
    }),
    imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
  ]))
  .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function() {
  let src = "source/img/**/*.png";
  let dest = "source/img";

  return gulp.src(src)
    .pipe(imagemin([
      webp({
        quality: 75
      })
    ]))
    .pipe(extReplace(".webp"))
    .pipe(gulp.dest(dest));
});

gulp.task("sprite", function(){
  return gulp.src("source/img/*.svg")
    .pipe(svgstore())

    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**/*.{woff, woff2}",
    "source/img/**",
    "source/js/**"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css"));
  gulp.watch("source/img/*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function(done) {
  server.reload();
  done();
})

gulp.task("build", gulp.series("clean", "copy", "css", "sprite", "html"))
gulp.task("start", gulp.series("build", "server"));
