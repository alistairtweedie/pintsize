// Load plugins
var gulp = require('gulp'),
    fs = require('fs'),
    es6transpiler = require('gulp-es6-transpiler'),
    concat = require('gulp-concat'),
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
  var input = fs.readFileSync('./css/base.css', 'utf8');

  gulp.src('./css/**/*.css')
      .pipe(watch(function(files) {
        gulp.src('./css/base.css')
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
      baseDir: './'
    },
    port: 3000
  });
});

// Javascript ES6 transpiler
gulp.task('es6', function () {
  return gulp.src('./es6/**/*.es6')
      .pipe(watch(function(files) {
        return files.pipe(es6transpiler())
          .pipe(concat('main.js'))
          .pipe(gulp.dest('./dist/js/'))
          .pipe(browserSync.reload({stream:true}));
  }));
});

// Function to call for reloading browsers
gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['pre-process', 'es6', 'bs-reload', 'browser-sync'], function(){
  gulp.start('pre-process');
  gulp.watch('css/**/*.css', ['pre-process']);
  gulp.watch('es6/**/*.es6', ['es6']);
  gulp.watch('dist/css/base.css', ['bs-reload']);
  gulp.watch(['*.html'], ['bs-reload']);
});
