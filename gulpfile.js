var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var rename      = require('gulp-rename');
var uglifycss   = require('gulp-uglifycss');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');


gulp.task('scripts', function() {
  return gulp.src(['site/js/vendor/*', 'site/js/_js/*'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('site/js'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('site/js'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('sass', function () {
  return gulp.src('site/css/_css/main.scss')
    .pipe(sass({
      includePaths: ['css'],
      onError: browserSync.notify
    }))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('site/css'))
    .pipe(rename('main.min.css'))
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(gulp.dest('site/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', ['sass', 'scripts'], function() {
  browserSync({
    server: {
      baseDir: 'site'
    }
  });
});

gulp.task('watch', function () {
  gulp.watch('site/css/_css/**', ['sass', 'reload']);
  gulp.watch('site/js/_js/**', ['scripts', 'reload']);
  gulp.watch(['site/*.html'], ['reload']);
});

gulp.task('reload', function () {
    browserSync.reload();
});

gulp.task('default', ['browser-sync', 'watch']);