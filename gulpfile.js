const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const gulpif = require('gulp-if');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();

let isProd = false;

const clean = () => {
  return del(['dist'])
}

const cleanDev = () => {
  return del(['dist/dev'])
}

const cleanBuild = () => {
  return del(['dist/build'])
}

const resources = () => {
  return src('src/resources/**')
    .pipe(gulpif(!isProd, dest('dist/dev/resources')))
    .pipe(gulpif(isProd, dest('dist/build/resources')))
}

const styles = () => {
  return src('src/scss/**/*.scss')
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(gulpif(isProd, cleanCSS({
      level: 2
    })))
    .pipe(gulpif(!isProd, sourcemaps.write()))
    .pipe(gulpif(!isProd, dest('dist/dev/css')))
    .pipe(gulpif(isProd, dest('dist/build/css')))
    .pipe(gulpif(!isProd, browserSync.stream()))
}

const htmlMinify = () => {
  return src('src/*.html')
    .pipe(gulpif(isProd, htmlMin({
      collapseWhitespace: true
    })))
    .pipe(gulpif(!isProd, dest('dist/dev')))
    .pipe(gulpif(isProd, dest('dist/build')))
    .pipe(gulpif(!isProd, browserSync.stream()))
}

const svgSprites = () => {
  return src('src/img/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(gulpif(!isProd, dest('dist/dev/img')))
    .pipe(gulpif(isProd, dest('dist/build/img')))
}

const scripts = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/script.js'
  ])
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(gulpif(isProd, uglify().on('error', notify.onError())))
    .pipe(gulpif(!isProd, sourcemaps.write()))
    .pipe(gulpif(!isProd, dest('dist/dev/js')))
    .pipe(gulpif(isProd, dest('dist/build/js')))
    .pipe(gulpif(!isProd, browserSync.stream()))
}

const images = () => {
  return src([
    'src/img/**/*.jpg',
    'src/img/**/*.jpeg',
    'src/img/**/*.png',
    'src/img/*.svg',
  ])
    .pipe(gulpif(isProd, image()))
    .pipe(gulpif(!isProd, dest('dist/dev/img')))
    .pipe(gulpif(isProd, dest('dist/build/img')))
}

const htmlInclude = () => {
  return src('src/*.html')
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulpif(!isProd, dest('dist/dev')))
    .pipe(gulpif(isProd, dest('dist/build')))
    .pipe(gulpif(!isProd, browserSync.stream()))
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist/dev'
    }
  })
}

watch('src/**/*.html', htmlMinify);
watch('src/scss/**/*.scss', styles);
watch('src/img/svg/**/*.svg', svgSprites);
watch('src/js/**/*.js', scripts);
watch('src/resources/**', resources);
watch('src/*.html', htmlInclude);
watch('src/partials/*.html', htmlInclude);

const toProd = (done) => {
  isProd = true;
  done();
}

exports.clean = clean;
exports.styles = styles;
exports.htmlMinify = htmlMinify;
exports.scripts = scripts;


exports.default = series(cleanDev, htmlMinify, htmlInclude, styles, images, svgSprites, scripts, resources, watchFiles)
exports.build = series(toProd, cleanBuild, htmlMinify, htmlInclude, styles, images, svgSprites, scripts, resources)
