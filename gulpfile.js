'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const htmlExtract = require('gulp-html-extract');
const stylelint = require('gulp-stylelint');

gulp.task('lint', ['lint:js', 'lint:html', 'lint:css']);

gulp.task('lint:js', () => {
  return gulp.src([
    '*.js',
    'test/**/*.js'
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint:html', () => {
  return gulp.src([
    '*.html',
    'demo/**/*.html',
    'test/**/*.html'
  ])
    .pipe(htmlExtract({
      sel: 'script, code-example code',
      strip: true
    }))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint:css', () => {
  return gulp.src([
    '*.html',
    'demo/**/*.html',
    'test/**/*.html'
  ])
    .pipe(htmlExtract({
      sel: 'style'
    }))
    .pipe(stylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

gulp.task('version:check', function() {
  const expectedVersion = new RegExp('^' + require('./package.json').version + '$');
  return gulp.src(['*.html'])
    .pipe(htmlExtract({sel: 'script'}))
    .pipe(find(/static get version.*\n.*/))
    .pipe(clip()) // Remove non-matching files
    .pipe(replace(/.*\n.*return '(.*)'.*/, '$1'))
    .pipe(grepContents(expectedVersion, {invert: true}))
    .pipe(expect({reportUnexpected: true}, []));
});

gulp.task('version:update', ['version:check'], function() {
  // Should be run from 'preversion'
  // Assumes that the old version is in package.json and the new version in the `npm_package_version` environment variable
  const oldversion = require('./package.json').version;
var find = require('gulp-find');
var replace = require('gulp-replace');
var expect = require('gulp-expect-file');
var grepContents = require('gulp-grep-contents');
var clip = require('gulp-clip-empty-files');
var git = require('gulp-git');
var find = require('gulp-find');
var replace = require('gulp-replace');
var expect = require('gulp-expect-file');
var grepContents = require('gulp-grep-contents');
var clip = require('gulp-clip-empty-files');
var git = require('gulp-git');
var find = require('gulp-find');
var replace = require('gulp-replace');
var expect = require('gulp-expect-file');
var grepContents = require('gulp-grep-contents');
var clip = require('gulp-clip-empty-files');
var git = require('gulp-git');
var find = require('gulp-find');
var replace = require('gulp-replace');
var expect = require('gulp-expect-file');
var grepContents = require('gulp-grep-contents');
var clip = require('gulp-clip-empty-files');
var git = require('gulp-git');
  const newversion = process.env.npm_package_version;
  if (!oldversion) {
    throw new 'No old version found in package.json';
  }
  if (!newversion) {
    throw new 'New version must be given as a npm_package_version environment variable.';
  }
  return gulp.src(['*.html'])
    .pipe(replace(oldversion, newversion))
    .pipe(gulp.dest('.'))
    .pipe(git.add());
});
