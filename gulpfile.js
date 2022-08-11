/*
 * @Description: 
 * @Author: huangshiwen
 * @Date: 2022-08-09 13:43:15
 */
const gulp = require("gulp");
const path = require("path");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const less = require("gulp-less");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");

const resolve = (dir) => path.join(__dirname, dir);
const libDir = resolve("/lib");
const esDir = resolve("/es");
const lessDir = resolve("/packages/**/style/*.less");
const indexJsDir = resolve("/packages/**/style/index.tsx");

// 复制 less 文件到 lib es 文件夹下
gulp.task("copy-less", () => {
    return (
        gulp
            .src(lessDir)
            // .pipe(sourcemaps.init())
            // .pipe(sourcemaps.write("."))
            .pipe(gulp.dest(libDir))
            .pipe(gulp.dest(esDir))
    );
});

// 根据 index.js 创建一个全新的 css.js 供按需加载 styel:'css' 使用
gulp.task("replace-indexjs", () => {
    return (
        gulp
            .src(indexJsDir)
            // .pipe(sourcemaps.init())
            .pipe(replace("less", "css"))
            .pipe(
                rename(function (path) {
                    path.basename = "css";
                    path.extname = ".js";
                })
            )
            // .pipe(sourcemaps.write("."))
            .pipe(gulp.dest(libDir))
            .pipe(gulp.dest(esDir))
    );
});

// 编译 less 文件到 es 和 lib 文件夹下
gulp.task("compile-less", () => {
    return (
        gulp
            .src(lessDir)
            // .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(autoprefixer())
            .pipe(cleanCSS())
            // .pipe(sourcemaps.write("."))
            .pipe(gulp.dest(libDir))
            .pipe(gulp.dest(esDir))
    );
});
gulp.task("image-png", () => {
  return (
      gulp
          .src(resolve("/packages/**/imgs/*.png"))
          .pipe(gulp.dest(libDir))
          .pipe(gulp.dest(esDir))
  );
});
gulp.task("image-svg", () => {
  return (
      gulp
          .src(resolve("/packages/**/imgs/*.svg"))
          .pipe(gulp.dest(libDir))
          .pipe(gulp.dest(esDir))
  );
});

gulp.task(
    "compile",
    gulp.series(gulp.parallel("copy-less", "replace-indexjs", "compile-less","image-png","image-svg"))
);
