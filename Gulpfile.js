const gulp = require('gulp');
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');
const bs = require('browser-sync');



// http://stackoverflow.com/questions/28048029/running-a-command-with-gulp-to-start-node-js-server
gulp.task('server', function() {
  const bSync = bs.create();

  nodemon({
    script: 'src/app.js',
    watch: ['src/app.js', 'src/config/*', 'src/models/*', 'src/routes/*', 'src/views/*/**'],
    ext: 'js hbs',
    env: { 'NODE_ENV': 'development' }
  }).on('start', () => {
    bSync.notify('Nodemon restarted');
    bSync.reload();
  });
});

gulp.task('compile-sass', () => {
  let input = './stylesheets/**/*.scss';
  let output = './public/css';
  return gulp
    // Find all `.scss` files from the `stylesheets/` folder
    .src(input)
    // Run Sass on those files
    .pipe(sass())
    // Write the resulting CSS in the output folder
    .pipe(gulp.dest(output));
});

gulp.task('default', ['server']);
