// Borrows heavily: https://github.com/sogko/gulp-recipes/blob/master/browser-sync-nodemon-expressjs/gulpfile.js
'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');
const bs = require('browser-sync');

const BS_DELAY = 1500;

gulp.task('nodemon', (next) => {
  let called = false;

  return nodemon({
    script: 'src/app.js',
    watch: ['src/app.js', 'src/config/*', 'src/models/*', 'src/routes/*', 'src/views/*'],
    ext: 'js hbs',
    env: { 'NODE_ENV': 'development' }
  }).on('start', () => {
    if (!called) { setTimeout(() => {
      next();
    }, BS_DELAY); }
    called = true;
  }).on('restart', () => {
    bs.notify('Restarting nodemon');
    setTimeout(() => {
      bs.reload();
    }, BS_DELAY);
  });
});

gulp.task('bs', ['nodemon'], () => {
  bs({
    browser: 'safari technology preview',
    notify: false,
    proxy: 'http://localhost:3000',
    port: 4000
  });
});

gulp.task('bs-reload', () => {
  bs.reload();
});

gulp.task('compile-sass', () => {
  let input = 'src/public/sass/*.scss';
  let output = 'src/public/css';
  return gulp
    .src(input)
    .pipe(sass())
    .pipe(gulp.dest(output));
});

gulp.task('default', ['bs'], () => {
  gulp.watch('src/public/sass/*', ['compile-sass', 'bs-reload']);
});
