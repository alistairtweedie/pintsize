// Load plugins
var gulp = require('gulp'),
    fs = require('fs'),
    shell = require('gulp-shell'),
    rm = require( 'gulp-rm' ),
    filter = require('gulp-filter'),
    es6transpiler = require('gulp-es6-transpiler'),
    ext_replace = require('gulp-ext-replace'),
    clean = require('gulp-clean'),
    changed = require('gulp-changed'),
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
    watch = require('gulp-watch'),
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

// Cleanup
gulp.task('clean:images', function(cb) {
  return gulp.src(['dist/images/**/*.*'], {read: false})
    .pipe(clean({force: true}));
});

gulp.task('clean:fonts', function(cb) {
  return gulp.src(['dist/fonts/**/*.*'], {read: false})
    .pipe(clean({force: true}));
});

gulp.task('clean:css', function(cb) {
  return gulp.src(['dist/css/**/*.*'], {read: false})
    .pipe(clean({force: true}));
});

gulp.task('clean:js', function(cb) {
  console.log('clean EVENTTTTT!!!');
  return gulp.src(['dist/js/**/*.*'], {read: false})
    .pipe(clean({force: true}));
});

gulp.task('clean:html', function(cb) {
  return gulp.src(['dist/**/*.html'], {read: false})
    .pipe(clean({force: true}));
});

// Pre process
gulp.task('pre-process', ['clean:css'], function(){
  var input = fs.readFileSync('./src/css/base.css', 'utf8');

  gulp.src('src/css/base.css')
      .pipe(watch('src/css/**/*.css'))
      .pipe(postcss(processors))
      .pipe(cssnext(input))
      .pipe(gulp.dest('./dist/css/'))
      .pipe(browserSync.reload({stream:true}));
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
gulp.task('es6', ['clean:js'], function () {
  return gulp.src('src/es6/**/*.es6')
      .pipe(watch('src/es6/**/*.es6'))
      .pipe(es6transpiler())
      .pipe(ext_replace('.js'))
      .pipe(gulp.dest('./dist/js/'))
      .pipe(browserSync.reload({stream:true}));
});

// Swig
gulp.task('templates', ['clean:html'], function() {
  gulp.src(['src/**/*.html'])
    .pipe(watch('src/**/*.html'))
    .pipe(shell('gulp build'))
    .pipe(browserSync.reload({stream:true}));
});

// Images
gulp.task('images', ['clean:images'], function () {
  gulp.src(['src/images/**/*.*'])
    .pipe(watch('src/images/**/*.*'))
    .pipe(gulp.dest('./dist/images'))
    .pipe(browserSync.reload({stream:true}));
});

// Fonts
gulp.task('fonts', ['clean:fonts'], function () {
  return gulp.src(['src/fonts/**/*.*'])
    .pipe(watch('src/fonts/**/*.*'))
    .pipe(shell('gulp clean:fonts'))
    .pipe(gulp.dest('./dist/fonts'))
    .pipe(browserSync.reload({stream:true}));
});

// Build
gulp.task('build', ['clean:html'], function() {
  gulp.src(['./src/**/*.html'])
    .pipe(swig({defaults: { cache: false }}))
    .pipe(gulp.dest('./dist'));
});

// Function to call for reloading browsers
gulp.task('bs-reload', function () {
  browserSync.reload();
});

// Default task
gulp.task('default', ['templates', 'pre-process', 'es6', 'images', 'fonts', 'bs-reload', 'browser-sync'], function(){
  gulp.start('pre-process');
});
