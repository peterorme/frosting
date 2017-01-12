var gulp = require('gulp');
var notify = require("gulp-notify");
var mocha = require('gulp-mocha');
var source = require('vinyl-source-stream')
var browserify = require('browserify')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var streamify = require('gulp-streamify')
var del = require('del');

var paths = {
	src: "./src/**/*.js",
	test: "./test/**/*.js",
	main: "./src/main.js", /* this is the main file of the lib */ 
	dist: "./dist/"
}

var LIB_VERSION = "0.0.2";
var LIB_NAME = "frosting." + LIB_VERSION;

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
  return del([paths.dist + '**/*']);
});

// using vinyl-source-stream: 
gulp.task('build', function() {
  var bundleStream = browserify(paths.main).bundle()
 
  bundleStream
    .pipe(source(LIB_NAME + ".js"))
    // .pipe(streamify(uglify()))
    .pipe(gulp.dest(paths.dist))
})

