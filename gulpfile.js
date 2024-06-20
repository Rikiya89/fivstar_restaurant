const gulp = require('gulp');
const path = require("path");
const glob = require('glob');
const dartSass = require('gulp-dart-sass');
const sassGlob = require( 'gulp-sass-glob-use-forward');

const autoprefixer = require('gulp-autoprefixer');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const plumber = require("gulp-plumber");
const browsersync = require('browser-sync').create();
const connectSSI = require('gulp-connect-ssi');
const connectPHP = require('gulp-connect-php');

let SETTING = require('./gulpfile.setting.js');


gulp.task('sass', (done) => {
	gulp.src(path.join(SETTING.SASS.SOURCE_PATH, SETTING.SASS.SOURCE_FILE), { sourcemaps : SETTING.SASS.SOURCEMAPS })
		.pipe(sassGlob())
		.pipe(dartSass(SETTING.SASS.OPTION).on('error', dartSass.logError))
		.pipe(autoprefixer(SETTING.SASS.AUTOPREFIXER))
		.pipe(gulp.dest(SETTING.SASS.OUTPUT_PATH, { sourcemaps : './' }));
	done();
});


gulp.task('webpack', (done) => {
	SETTING.WEBPACK.OPTION.entry = {};

	glob.sync(SETTING.WEBPACK.SOURCE_FILE, { ignore : SETTING.WEBPACK.IGNORE_FILE, cwd : SETTING.WEBPACK.SOURCE_PATH}).map(function(name) {
		SETTING.WEBPACK.OPTION.entry[name] =  './' + path.join(SETTING.SASS.SOURCE_PATH, name);
	});
	gulp.src(path.join(SETTING.WEBPACK.SOURCE_PATH, SETTING.WEBPACK.SOURCE_FILE))
		.pipe(plumber())
		.pipe(webpackStream(SETTING.WEBPACK.OPTION, webpack))
		.pipe(gulp.dest(SETTING.WEBPACK.OUTPUT_PATH));
	done();
});


gulp.task('browsersync', (done) => {
	browsersync.init({
		server : {
			baseDir : SETTING.BROWSERSYNC.DOCUMENT_ROOT,
			index : 'index.html',
		},
		middleware : [
			connectSSI({
				baseDir : SETTING.BROWSERSYNC.DOCUMENT_ROOT,
				ext : '.html'
			})
		],
		startPath : SETTING.BROWSERSYNC.STARTPATH,
		ghostMode : SETTING.BROWSERSYNC.GHOSTMODE,
		notify : SETTING.BROWSERSYNC.NOTIFY,
	});
	done();
});


gulp.task('browsersync-connect-php', (done) => {
	connectPHP.server({
		port : SETTING.PHP_CONNECT.PORT,
		base : SETTING.BROWSERSYNC.DOCUMENT_ROOT
	}, () => {
		browsersync.init({
			proxy : 'localhost:' + SETTING.PHP_CONNECT.PORT,
			middleware : [
				connectSSI({
					baseDir : SETTING.BROWSERSYNC.DOCUMENT_ROOT,
					ext : '.html'
				})
			],
			startPath : SETTING.BROWSERSYNC.STARTPATH,
			ghostMode : SETTING.BROWSERSYNC.GHOSTMODE,
			notify : SETTING.BROWSERSYNC.NOTIFY,
		})
	});
	done();
});

gulp.task('browsersync-reload', (done) => {
	browsersync.reload();
	done();
});

gulp.task('watch', (done) => {
	gulp.watch(path.join(SETTING.SASS.SOURCE_PATH, SETTING.SASS.SOURCE_FILE), gulp.series('sass'));
	gulp.watch(path.join(SETTING.WEBPACK.SOURCE_PATH, SETTING.WEBPACK.SOURCE_FILE), gulp.series('webpack'));
	gulp.watch(SETTING.BROWSERSYNC.DOCUMENT_ROOT + '/**/*.php' ,  gulp.series('browsersync-reload'));
	gulp.watch(SETTING.BROWSERSYNC.DOCUMENT_ROOT + '/**/*.html',  gulp.series('browsersync-reload'));
	gulp.watch(SETTING.BROWSERSYNC.DOCUMENT_ROOT + '/**/*.css' ,  gulp.series('browsersync-reload'));
	gulp.watch(SETTING.BROWSERSYNC.DOCUMENT_ROOT + '/**/*.js'  ,  gulp.series('browsersync-reload'));
	done();
});

gulp.task('default', (() => {
	SETTING.SASS.SOURCEMAPS = true;
	SETTING.WEBPACK.OPTION.mode = 'development';

	return gulp.series(
		'sass',
		'webpack',
		'browsersync',
		'watch'
	)
})());

gulp.task('php', (() => {
	SETTING.SASS.SOURCEMAPS = true;
	SETTING.WEBPACK.OPTION.mode = 'development';

	return gulp.series(
		'sass',
		'webpack',
		'browsersync-connect-php',
		'watch'
	)
})());

gulp.task('prod', (() => {
	SETTING.SASS.SOURCEMAPS = false;
	SETTING.WEBPACK.OPTION.mode = 'production';

	return gulp.series(
		'sass',
		'webpack',
		'browsersync',
		'watch'
	)
})());
