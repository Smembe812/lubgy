var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream')
var sass = require('gulp-sass')
//var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
//var concat = require('gulp-concat');
//var sourcemaps = require('gulp-sourcemaps');

gulp.task('compile:css', function(){
  return gulp.src(['./src/styles/sass/*.scss'])
    .pipe(sass())
    //.pipe(minifyCSS())
    .pipe(gulp.dest('./public/styles/'))
});

gulp.task('compile:js', function(){
  var bundle = browserify('./src/scripts/main.js').bundle();

  return bundle
    .pipe(source("lugby.js"))
    .pipe(gulp.dest("./public/scripts/js/"));
});

gulp.task('compile:bootstrap', function(){
  return gulp.src(['./node_modules/bootstrap/scss/**/*.scss'])
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/styles/bootstrap/'))
})

gulp.task('watch', gulp.series(["compile:js", "compile:css"], function() { 
  gulp.watch("./src/scripts/**/*.js", gulp.series("compile:js"));
  gulp.watch("./src/styles/sass/**/*.scss", gulp.series("compile:css"))
}))


