var gulp = /*require('./xurei-gulp')*/(require('gulp'));

gulp.task('a', ['b'], function () {
	console.log('one');
});

gulp.task('b', ['a'], function () {
	console.log('two');
});

gulp.task('default', ['a']);
gulp.task('tasks', require('gulp-task-graph-visualizer')());