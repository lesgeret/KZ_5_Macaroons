'use strict'

const gulp = require('gulp');
const less = require('gulp-less');

gulp.task('less', function(){
    return gulp.src('./css/style.less')
        .pipe(less({}))
        .pipe(gulp.dest('./compiled'))
});

gulp.task('watch', function(){
    return gulp.watch('./css/*.less', gulp.series('less'));
});

gulp.task('default', gulp.series('less', 'watch'));