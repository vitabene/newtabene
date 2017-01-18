var gulp = require('gulp'),
		plumber = require('gulp-plumber'),
		sourcemaps = require('gulp-sourcemaps'),
		sass = require('gulp-ruby-sass'),
    uglify = require('gulp-uglify'),
		cleanCSS = require('gulp-clean-css'),
		browserSync = require('browser-sync').create();

gulp.task('sass', function () {
  return sass('css/*.scss', { sourcemap: true })
    .on('error', sass.logError)
    .pipe(sourcemaps.write())
		.pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write('maps', {
      includeContent: false,
      sourceRoot: 'source'
    }))
    .pipe(gulp.dest('build/css'))
		.pipe(browserSync.stream());
});

gulp.task('uglify', function(){
	gulp.src('js/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('build/js'))
		.pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "./",
			index: "./pages/popup.html"
		}
	});
});

gulp.task('default', ['browser-sync', 'watch']);
gulp.task('watch', function(){
	gulp.watch('css/*.scss*', ['sass']);
	gulp.watch('pages/popup.html').on('change', browserSync.reload);
	gulp.watch('js/**/*.js', ['uglify']).on('change', browserSync.reload);
});
