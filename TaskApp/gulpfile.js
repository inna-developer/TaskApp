var gulp         = require('gulp'),
		less         = require('gulp-less'),
		autoprefixer = require('gulp-autoprefixer'),
		cleanCSS    = require('gulp-clean-css'),
		rename       = require('gulp-rename'),
		browserSync  = require('browser-sync').create(),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglify');

gulp.task('browser-sync', ['less', 'scripts'], function() {
		browserSync.init({
				server: {
						baseDir: "./app"
				},
				notify: false
		});
});


gulp.task('less', function () {
  return gulp.src('less/*.less')
    .pipe(less())
    .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
    .pipe(cleanCSS())
    .pipe(gulp.dest('app/css'));
});

gulp.task('scripts', function() {
	return gulp.src([
		'./app/libs/angular/angular.js',
		])
		.pipe(concat('vendor.js'))
		//.pipe(uglify()) //Minify libs.js
		.pipe(gulp.dest('./app/js/'));
});

/*Minify files*/
gulp.task('gulp-concat-libs-css', function(){
  return gulp.src([
		'./app/libs/bootstrap/css/bootstrap.css',
		])
  .pipe(concat('vendor.css'))
  .pipe(cleanCSS())
  .pipe(gulp.dest('app/css'));
});

gulp.task('gulp-uglify', function(){
  gulp.src('app/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('app/js/'));
});


gulp.task('watch', function () {
	gulp.watch('less/*.less', ['less']);
	gulp.watch('app/libs/**/*.js', ['scripts']);
	gulp.watch('app/js/*.js').on("change", browserSync.reload);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
