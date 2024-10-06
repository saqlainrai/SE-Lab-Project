const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// Task to compile SCSS to CSS
gulp.task('scss-to-css', () => {
    return gulp.src('style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'));
});

gulp.task('clean-css', () => {
    return gulp.src('css/**/*.css') // Source CSS files from the 'css' directory
        .pipe(cleanCSS({ compatibility: 'ie8' })) // Clean and minify CSS
        .pipe(rename({ suffix: '.min' })) // Add .min suffix
        .pipe(gulp.dest('dist')); // Output cleaned CSS files to 'dist' directory
});

// Watch task
gulp.task('watch', () => {
    // gulp.watch('./style.scss', gulp.series('scss-to-css')); // Watch SCSS file
    // gulp.watch('./dist/style.css', gulp.series('clean-css')); // Watch CSS file
    gulp.watch('style.scss', gulp.series('scss-to-css', 'clean-css')); 
});

// Default task
gulp.task('default', gulp.series('watch'));
