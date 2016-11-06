/**
 * Created by timur on 11/6/16.
 */

const path = require('path')
const gulp = require('gulp')
const Promise = require('bluebird')
const rimrafAsync = Promise.promisify(require('rimraf'))
const execAsync = Promise.promisify(require('child_process').exec)
const browserSync = require('browser-sync').create()


const paths = {
  src: path.resolve('src'),
  dist: path.resolve('dist'),
}


gulp.task('clean', () => rimrafAsync(paths.dist))

gulp.task('bundle', ['clean'], () => execAsync('node_modules/.bin/webpack'))

gulp.task('copy', ['clean'], () => gulp.src(path.join(paths.src, '**/*.html'))
  .pipe(gulp.dest(paths.dist)))

gulp.task('build', ['bundle', 'copy'])

gulp.task('build-reload', ['build'], done => {
  browserSync.reload()
  done()
})

gulp.task('reload', () => browserSync.reload())

gulp.task('serve', ['build'], done => {
  browserSync.init({server: paths.dist})
  done()
})

gulp.task('watch', ['build', 'serve'], () => {
  gulp.watch(path.join(paths.src, '**'), ['build-reload'])
})

