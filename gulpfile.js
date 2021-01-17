'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify-es').default,
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    plumber = require("gulp-plumber"),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'app/**/index.pug',
        js: 'app/js/app.js',
        style: 'app/style/app.scss',
        img: 'app/img/**/*.*',
        fonts: 'app/fonts/**/*.*'
    },
    watch: {
        html: 'app/**/*.pug',
        js: 'app/js/**/*.js',
        style: 'app/style/**/*.scss',
        img: 'app/img/**/*.*',
        fonts: 'app/fonts/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "genexys"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
    return gulp.src(path.src.html)
      .pipe(plumber())
        .pipe(pug({pretty: false}))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    return gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    return gulp.src(path.src.style)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['app/style/'],
            outputStyle: 'compressed',
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    return gulp.src(path.src.img)
        .pipe(plumber())
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    return gulp.src(path.src.fonts)
        .pipe(plumber())
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('watch', function(){
    gulp.watch(path.watch.html, gulp.parallel('html:build'))
    gulp.watch(path.watch.style, gulp.parallel('style:build'))
    gulp.watch(path.watch.js, gulp.parallel('js:build'))
    gulp.watch(path.watch.img, gulp.parallel('image:build'))
    gulp.watch(path.watch.fonts, gulp.parallel('fonts:build'))

    // watch([path.watch.html], function(event, cb) {
    //     gulp.start('html:build');
    // });
    // watch([path.watch.style], function(event, cb) {
    //     gulp.start('style:build');
    // });
    // watch([path.watch.js], function(event, cb) {
    //     gulp.start('js:build');
    // });
    // watch([path.watch.img], function(event, cb) {
    //     gulp.start('image:build');
    // });
    // watch([path.watch.fonts], function(event, cb) {
    //     gulp.start('fonts:build');
    // });
});


gulp.task('default', gulp.parallel('html:build', 'style:build', 'js:build', 'image:build', 'fonts:build', 'watch'));
