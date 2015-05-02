// Load plugins
var gulp = require('gulp'),
    fs = require('fs'),
    shell = require('gulp-shell'),
    es6transpiler = require('gulp-es6-transpiler'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    swig = require('gulp-swig'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    browserReload = browserSync.reload,
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer-core'),
    mqpacker = require('css-mqpacker'),
    cssnext = require('gulp-cssnext'),
    cssgrace = require('cssgrace'),
    csswring = require('csswring'),
    atImport = require('postcss-import'),
    postcssFor = require('postcss-for'),
    postcssMixins = require('postcss-mixins'),
    postcssNested = require('postcss-nested'),
    lost = require('lost'),
    zIndex = require('postcss-zindex'),
    simpleExtend = require('postcss-simple-extend');

// PostCSS
var processors = [
  cssnext,
  cssgrace,
  simpleExtend,
  postcssFor,
  postcssMixins,
  postcssNested,
  autoprefixer({browsers: ['last 5 versions']}),
  atImport,
  mqpacker,
  csswring({
    preserveHacks: true,
    removeAllComments: true
  }),
  lost
];

// Pre process
gulp.task('pre-process', function(){
  var input = fs.readFileSync('./src/css/base.css', 'utf8');

  gulp.src('./src/css/**/*.css')
      .pipe(watch(function(files) {
        gulp.src('./src/css/base.css')
          .pipe(postcss(processors))
          .pipe(cssnext(input))
          .pipe(gulp.dest('./dist/css/'))
          .pipe(browserSync.reload({stream:true}));
      }));
});

// Initialize browser-sync
gulp.task('browser-sync', function() {
  browserSync.init(null, {
    server: {
      baseDir: './dist/'
    },
    port: 4000,
  });
});

// Javascript ES6 transpiler
gulp.task('es6', function () {
  return gulp.src('./src/es6/**/*.es6')
      .pipe(watch(function(files) {
        return files.pipe(es6transpiler())
          .pipe(concat('main.js'))
          .pipe(gulp.dest('./dist/js/'))
          .pipe(browserSync.reload({stream:true}));
      }));
});

// Swig
gulp.task('templates', function() {
  gulp.src(['./src/**/*.html'])
    .pipe(watch())
    .pipe(shell('gulp build'))
    .pipe(shell('gulp clean'))
    .pipe(browserSync.reload({stream:true}));
});

// Images
gulp.task('images', function () {
  return gulp.src(['./src/images/**/*.*'])
    .pipe(watch())
    .pipe(gulp.dest('./dist/images'));
});

// Fonts
gulp.task('fonts', function () {
  return gulp.src(['./src/fonts/**/*.*'])
    .pipe(watch())
    .pipe(gulp.dest('./dist/fonts'));
});

// Clean
gulp.task('clean', function () {
  return gulp.src(['./dist/_includes/'], {read: false})
    .pipe(clean());
});

// Build
gulp.task('build', function() {
  gulp.src(['./src/**/*.html'])
    .pipe(swig({defaults: { cache: false }}))
    .pipe(gulp.dest('./dist'));
});

// Function to call for reloading browsers
gulp.task('bs-reload', function () {
  browserSync.reload();
});

// Default task
gulp.task('default', ['templates', 'images', 'fonts', 'pre-process', 'es6', 'bs-reload', 'browser-sync'], function(){
  gulp.start('pre-process');
  gulp.watch('src/css/**/*.css', ['pre-process']);
  gulp.watch('src/es6/**/*.es6', ['es6']);
  gulp.watch('dist/css/base.css', ['bs-reload']);
  gulp.watch('src/images/**/*.*').on('change', ['images']);
  gulp.watch('src/fonts/**/*.*').on('change', ['fonts']);
});
