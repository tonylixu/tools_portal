const PATHS = {
  // Input paths
  html_in: 'app/*.html',

  // Output paths
  html_out: 'dist/'
};

var gulp = require('gulp');
var crisper = require('gulp-crisper');
var minify = require('gulp-htmlmin');
var gulpif = require('gulp-if');
var gulpSeq = require('gulp-sequence');
var uglify = require('gulp-uglify');
var vulcanize = require('gulp-vulcanize');
var del = require('del');

/*
 * Define build task, it has a dependency on the default task
 */
gulp.task('build', ['default'], function () {
  return gulp.src('[dist]').pipe(gulp.dest('_build'));
});

/*
 * Default Gulp task
 * 
 * Runs a clean (to clear out /build) and then builds the projects
 * This default task depends on clean and build
 */
gulp.task('default', gulpSeq('clean', 'build'));


