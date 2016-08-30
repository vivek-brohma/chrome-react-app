var gulp  = require('gulp');

var copy = require('gulp-copy')
	,browserify = require('browserify')
	,buffer = require('vinyl-buffer')
	,gulpCssNano = require('gulp-cssnano')
	,gulpIf = require('gulp-if')
	,gulpLess = require('gulp-less')
	,gulpUglify = require('gulp-uglify')
	,reactify = require('reactify')
	,source = require("vinyl-source-stream");

var isProd = (process.env.NODE_ENV == 'production')
	,statics = ['index.html', 'background.js', 'manifest.json', 'images/*', 'fonts/*'];

gulp.task('statics', function(){
	return gulp.src(statics)
		.pipe(copy('build'));
});

gulp.task('style', function(){
	if(!isProd) gulp.watch(['less/**'], ['style']);

	return gulp.src('less/app.less')
		.pipe(gulpLess())
		.pipe(gulpCssNano())
		.pipe(gulp.dest('build/css'));
});

gulp.task('browserify', function(){
	if(!isProd) gulp.watch(['js/**', 'config/**'], ['browserify']);
	if(!isProd) gulp.watch(statics, ['init']);

	return browserify({debug: !isProd})
		.transform("babelify", {presets: ["es2015", "react"]})
		.add('js/app.jsx')
		.bundle()
		.pipe(source("app.js"))
		.pipe(buffer())
		.pipe(gulpIf(isProd, gulpUglify()))
		.pipe(gulp.dest('./build/js'));
});

gulp.task('init', ['statics']);

gulp.task('build', ['browserify', 'style']);

gulp.task('default', ['build']);