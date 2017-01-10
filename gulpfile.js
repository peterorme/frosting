var gulp = require('gulp');
var notify = require("gulp-notify");
var mocha = require('gulp-mocha');

var paths = {
	src: "./src/**/*.js",
	test: "./test/**/*.js"
}

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
