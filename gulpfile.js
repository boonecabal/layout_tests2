const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// css task
function cssTask() {
  return src(['bootstrap/dist/css/bootstrap.min.css'])
    .pipe(dest('src/css'));
}

// scss task
function scssStylesTask() {
  return src(['src/scss/*.scss'])
    .pipe(sass())
    .pipe(dest('src/css/styles'));
}

function scssTask() {
  return src(['bootstrap/scss/bootstrap.scss'])
    .pipe(sass())
    .pipe(dest('src/css'));
}

// js task
function jsTask() {
  return src([
    'bootstrap/dist/js/bootstrap.min.js', 
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/jquery/dist/jquery.slim.min.js',
    'node_modules/tether/dist/js/tether.min.js',
    'node_modules/@popperjs/core/dist/umd/popper.min.js',
    'bootstrap/dist/js/bootstrap.bundle.min.js'])
    .pipe(dest('src/js'));
}

// browser refresh
function browserSyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: './src'
    }
  });
  cb();
}

function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

// watcher
function watchTask() {
  watch('src/*.html', browserSyncReload);
  watch(
    ['src/scss/*.scss', 'node_modules/bootstrap/scss/bootstrap.scss'],
    series(scssTask, scssStylesTask, cssTask, jsTask, browserSyncReload));
}

exports.default = series(
  scssTask,
  scssStylesTask,
  cssTask,
  jsTask,
  browserSyncServe,
  watchTask
);
