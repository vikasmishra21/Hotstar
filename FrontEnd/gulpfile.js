const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const uglify = require('gulp-uglify-es').default;
const uglifycss = require('gulp-uglifycss');
const concat = require('gulp-concat')
const useref = require('gulp-useref')
const gulpif = require('gulp-if')
const htmlmin = require('gulp-htmlmin')
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const del = require('del');

function cleanBuild() {
    return del('./dist/**/*');
}


gulp.task('imageMin', function () {
    return gulp.src('assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/images'))
})

gulp.task('html', function () {
    return gulp.src('*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', uglifycss()))
        .pipe(gulpif('*.html', htmlmin({ collapseWhitespace: true, removeComments: true })))
        .pipe(gulpif('!**/*.html', rev()))
        .pipe(revReplace())
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', gulp.series(cleanBuild, 'imageMin', 'html'))

