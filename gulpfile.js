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

/**
 * Define build task, it has a dependency on the default task
 */
gulp.task('build', ['default'], function () {
  return gulp.src('[dist]').pipe(gulp.dest('_build'));
});

/**
 * Default Gulp task
 * 
 * Runs a clean (to clear out /build) and then builds the projects
 * This default task depends on clean and build
 */
gulp.task('default', gulpSeq('clean', 'build'));

/**
 * Gulp clean task
 * 
 * Cleans out /build by deleting the entire folder using 'del'
 */
gulp.task('clean', function() {
  return del(['dist']);
});

/**
 * Gulp build task
 * 
 * Builds the project by doing the following:
 * 1) Vulcanizing HTML imports by calling helper method
 * 2) Move /admin folder to dist
 * 3) Move all HTML files in /app to dist
 * 4) Move images to dist
 * 5) scripts to /dist
 */
gulp.task('build', ['vulcanize', 'moveAdmin', 'moveHTML', 'moveImg', 'moveScripts'], function (){

});

/** Gulp vulcanize task. Calls helper method to vulcanize HTML imports */
gulp.task('vulcanize', function() {
  return vulcanizeImports();
});

/**
 * Vulcanize the given HTML file.
 * 
 * This wil use the 'vulcanize' tool to inline all HTML imports in a given file,
 * reduce network activity
 * 
 * Order of Events:
 * 1) Pipes to source HTML file to 'vulcanize' with args. Inlines the HTML/CSS/JS and strips all comments (except @license decelerations)
 * 2) Pipes to 'crisper' to separate the JS into it's own file for CSP compliance aned reduction of HTML parser load
 * 3) Pipes to 'HTMLminifier' to minify the HTML code (remove whitespaces, etc). ONLY MINIFIES IF .HTML
 * 4) Pipes to 'uglify' to minify the JS code. ONLY MINIFIES IF .JS
 * 5) Pipes to output to the specified directory
 */
function vulcanizeImports() {
  return gulp.src(PATHS.elements_in)
        .pipe(vulcanizeHTML())
        .pipe(crisper())
        .pipe(gulpif('*.html', minifyHTML()))
        .pipe(gulpif('*.js', uglifyJS()))
        .pipe(gulp.dest(PATHS.elements_out))
}

/**
 * vulcanize: Reduce an HTML file and its dependent HTML Imports into one file
 * source: https://www.npmjs.com/package/vulcanize
 */
function vulcanizeHTML() {
  console.log("=== VULCANIZE ===");
  return vulcanize({
    inlineScripts: true,
    inlineCss: true,
    stripComments: true
  })
}

/** Gulp move admin task. Move the /admin folders to dist */
gulp.task('moveAdmin', function () {
  return moveAdmin();
})

/** Helper method to move all HTML files in /app/admin to /dist/admin */
function moveAdmin() {
  return gulp.src(PATHS.admin_in)
      .pipe(gulpif('*.html', minifyHTML()))
      .pipe(gulp.dest(PATHS.admin_out));
}