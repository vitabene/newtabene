var gulp = require('gulp'),
		plumber = require('gulp-plumber'),
		sourcemaps = require('gulp-sourcemaps'),
		sass = require('gulp-ruby-sass'),
    uglify = require('gulp-uglify'),
		cleanCSS = require('gulp-clean-css');

gulp.task('sass', function () {
  return sass('css/*.scss', { sourcemap: true })
    .on('error', sass.logError)
    .pipe(sourcemaps.write())
		.pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write('maps', {
      includeContent: false,
      sourceRoot: 'source'
    }))
    .pipe(gulp.dest('build/css'));
});

gulp.task('uglify', function(){
	gulp.src('js/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('build/js'));
});

gulp.task('default', ['watch']);
gulp.task('watch', function(){
	gulp.watch('css/*.scss*', ['sass']);
	gulp.watch('js/**/*.js', ['uglify']);
});
