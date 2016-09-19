var fs = require('fs');
var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// Path configuration
var path = {
  root: '../',
  src: {
    style: './src/style/index.scss',
    allStyles: './src/style/**/*.scss',
    tpl: './src/template/index.pug',
    allTemplates: './src/template/**/*.pug',
  },
  dist: {
    html: '../*.html',
    htmlDir: '../',
    css: '../css/*.css',
    cssDir: '../css/',
  },
};

// Log helpers
function logError(text) {
  console.log(
    `\x1b[1m\x1b[31m${text}\x1b[0m`
  );
}

function log(text) {
  console.log(
    `\x1b[1m${text}\x1b[0m`
  );
}

function logInfo(text) {
  console.log(
    `\x1b[34m${text}\x1b[0m`
  );
}

function logSuccess(text) {
  console.log(
    `\x1b[1m\x1b[32m${text}\x1b[0m`
  );
}

//Template task
gulp.task(
  'tpl',
  function markupIt() {
    gulp.src(path.src.tpl)
      .pipe(pug({}))
      .pipe(gulp.dest(path.dist.htmlDir));
  }
);

//Sass task
gulp.task(
  'style',
  function styleIt() {
    gulp.src(path.src.style)
      .pipe(sass().on('error', sass.logError))
      .pipe(cleanCSS({ debug: true }, function clean(details) {
          logInfo(`File ${details.name}`);
          logInfo(`\t-> ${details.stats.originalSize} (original)`);
          logInfo(`\t-> ${details.stats.minifiedSize} (minified)`);
        }
      ))
      .pipe(rename({
        suffix: '.min',
      }))
      .pipe(gulp.dest(path.dist.cssDir));
  }
);

//Serve task
gulp.task(
  'serve',
  function () {
    browserSync.init(
      {
        server: {
          baseDir: path.root,
        },
      }
    );
  }
);

//Watch task
gulp.task(
  'watch',
  ['serve'],
  function watchMode() {
    gulp.watch(path.src.allStyles, ['style']);
    gulp.watch(path.src.allTemplates, ['tpl']);
    gulp.watch([path.dist.html, path.dist.css]).on('change', reload);
    log(`BrowserSync reloads on template and style changes`);
  }
);
