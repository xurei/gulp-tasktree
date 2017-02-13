var gulp = require('gulp');
var tasktree = require('./index');
gulp.task('tasks', tasktree());

gulp.task('a', function () {
	console.log('one');
});

gulp.task('b', ['a'], function () {
	console.log('two');
});

gulp.task('c', ['b'], function () {
	console.log('three');
});

gulp.task('d', ['c'], function () {
	console.log('four');
});

gulp.task('clean', function () {
	console.log('Cleaned !');
});

gulp.task('default', ['clean', 'd']);