// Example:
// npm install gulp -g
// cd my-project
// npm install gulp --save-dev
// npm install gulp-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-clean gulp-notify gulp-rename gulp-cache browser-sync --save-dev

// Most of this is taken from: 
// http://markgoodyear.com/2014/01/getting-started-with-gulp/


var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var notify = require('gulp-notify');

// Handy file paths
paths = {
	scss: "./static/scss/",
	css:  "./static/css/",
	img:  "./static/img/",
	js:   "./static/js/"
}

// SASS
gulp.task('sass', function() {
	// Be specific in what file to process
	return gulp.src(paths.scss+'app.scss')
		.pipe(sass({ style: 'expanded' }))
		.pipe(autoprefixer('> 5%', 'last 2 version', 'ie 9'))
		.pipe(minifycss())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.css))
		// .pipe(gulp.dest('./_site/static/css/'))
		// .pipe(notify({ message: 'Styles task complete' }));
});

// COPY CSS
gulp.task('copycss', function() {
	return gulp.src(paths.css+'app.min.css')
		.pipe(gulp.dest('./_site/static/css/'))
		// .pipe(notify({ message: 'Copied Minified CSS to _site/static/css' }));
});


// JEKYLL
// Start a `jekyll build` task
// From: http://stackoverflow.com/questions/21293999/use-jekyll-with-gulp
gulp.task('jekyll-build', function() {
	require('child_process').spawn('jekyll', ['build', '--config=_config.dev.yml'], {stdio: 'inherit'});
});

// Start a `jekyll build --watch` task
gulp.task('jekyll-watch', function() {
	require('child_process').spawn('jekyll', ['build', '--watch', '--config=_config.dev.yml'], {stdio: 'inherit'});
});

// BROWSER-SYNC
gulp.task('browser-sync', function() {
	// reload when Jekyll-generated files change
	browserSync.init(['./_site/static/**/*.css', './_site/**/*.html'], {
		server: {
			baseDir: './_site/'
		}
    });
});

// WATCH
gulp.task('watch', function() {
	// TEST: [Only] Run `jekyll build` when I update (the version in) settings.yml
	// gulp.watch('./_config.yml', ['jekyll']);

	// Run Sass when I update SCSS files
	gulp.watch(paths.scss+'**/*.scss', ['sass', 'copycss']);
	// gulp.watch(paths.js+'**/*.js', ['scripts']);
	// gulp.watch(paths.img+'**/*', ['images']);
});


// DEFAULT task
gulp.task('default', ['jekyll-watch', 'watch','browser-sync']);
