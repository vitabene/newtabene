var gulp = require('gulp'),
		plumber = require('gulp-plumber'),
		sourcemaps = require('gulp-sourcemaps'),
		sass = require('gulp-ruby-sass'),
    uglify = require('gulp-uglify'),
		browserSync = require('browser-sync').create();

gulp.task('sass', function () {
  return sass('css/*.scss', { sourcemap: true })
    .on('error', sass.logError)
    .pipe(sourcemaps.write())
    .pipe(sourcemaps.write('maps', {
      includeContent: false,
      sourceRoot: 'source'
    }))
    .pipe(gulp.dest('css'))
		.pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
	browserSync.init({
			server: {
					baseDir: "./",
					index: "newtab.html"
			}
	});
});

gulp.task('default', ['browser-sync', 'watch']);
gulp.task('watch', function(){
	gulp.watch('css/*.scss*', ['sass']);
	// gulp.watch('js/core.js').on('change', browserSync.reload);
	// gulp.watch('newtab.html').on('change', browserSync.reload);
	// gulp.watch('popup.html').on('change', browserSync.reload);
});
