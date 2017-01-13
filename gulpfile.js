var gulp = require('gulp');
var notify = require("gulp-notify");
var mocha = require('gulp-mocha');
var source = require('vinyl-source-stream')
var browserify = require('browserify')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var streamify = require('gulp-streamify')
var del = require('del');
var yuidoc = require("gulp-yuidoc-relative"); /* api documentation, works better than gulp-yuidoc */

var paths = {
	src: "./src/**/*.js",
	test: "./test/**/*.js",
	main: "./src/main.js", /* this is the main file of the lib */ 
	dist: "./dist/",
	doc: "./dist/doc"
}

var package_json = require('./package.json')

// removing var LIB_VERSION = "0.0.3-SNAPSHOT";
// removing var LIB_NAME = "frosting." + LIB_VERSION;

// thus is just a dummy hello function 
helloFunc = function(){
    gulp.src(paths.src)
    	.pipe(notify("Hello Gulp!"));
};

// run tests, and pass errors to gulp-notify
gulp.task('test', function() {
	return gulp.src(paths.test)
		.pipe(mocha({ reporter: 'spec'})
			.on("error", notify.onError({message: 'Error: <%= error.message %>'}))
		)
	}
);

// watch src and test folder and run tests on change
gulp.task("watch", [], function () {
  gulp.watch([paths.test, paths.src], ["test"]);
});

gulp.task('hello', helloFunc);

gulp.task('default', helloFunc);

// clean dist folder
gulp.task('clean', function () {
  return del([paths.dist + '/**/*', paths.doc + "/**/*"]);
});

// using vinyl-source-stream: 
gulp.task('build', function() {
  var bundleStream = browserify(paths.main).bundle()
 
  bundleStream
    .pipe(source(package_json.name.toLowerCase() + "." + package_json.version + ".js"))
    // .pipe(streamify(uglify()))
    .pipe(gulp.dest(paths.dist))
})

var yuidocOptions = {
   project: {
    "name": package_json.name,
    "description": package_json.description,
    "version": package_json.version,
    "url": package_json.homepage
   }
}

gulp.task('doc', function(){
	gulp.src(paths.src)
	  .pipe(yuidoc(yuidocOptions))
	  .pipe(gulp.dest(paths.doc));
});
