/* global require */

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var del = require('del');

// Assets for the project
var Assets = {
    css: {
        main: 'example.scss',
        compiled: 'example.css'
    },
    js: {
        main: 'jquery.creep.js',
        minified: 'jquery.creep.min.js'
    }
};

// Clean the current directory
gulp.task('clean', function (cb) {
    del([Assets.js.minified], cb);
});

// Check the code meets the following standards outlined in .jshintrc
gulp.task('jshint', function () {
    return gulp.src('./' + Assets.js.main)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile the saas stylesheet
gulp.task('saas', function () {
    return gulp.src(Assets.css.main)
        .pipe(sass({
            // Options are 'nested', 'compact', 'compressed', 'expanded'
            outputStyle: 'compressed'
        }))
        .pipe(rename(Assets.css.compiled))
        .pipe(gulp.dest('./'));
});

// Uglify aka minify the main file
gulp.task('uglify', ['clean'], function () {
    return gulp.src('./' + Assets.js.main)
        .pipe(uglify({
            // See the uglify documentation for more details
            compress: {
                comparisons: true,
                conditionals: true,
                dead_code: true,
                drop_console: true,
                unsafe: true,
                unused: true
            }
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./'));
});

// Register the default task
gulp.task('build', ['jshint', 'saas', 'uglify']);

// Watch for changes to the main file
gulp.task('default', function () {
    gulp.watch('./' + Assets.js.main, ['jshint', 'saas', 'uglify']);
});

// 'gulp jshint' to check the syntax
// 'gulp saas' to compile the saas file
// 'gulp uglify' to uglify the main file
