const gulp = require('gulp')

gulp.task('default', async () => {
    await gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('./dist'))

    await gulp.src('./node_modules/jquery/dist/jquery.slim.min.js')
    .pipe(gulp.dest('./dist'))

    await gulp.src('./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
    .pipe(gulp.dest('./dist'))
})