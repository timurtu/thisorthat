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
  bundle: path.resolve('dist/bundle.js'),
}


gulp.task('clean', () => rimrafAsync(paths.bundle))

gulp.task('bundle', ['clean'], () => execAsync('node_modules/.bin/webpack'))

gulp.task('build', ['bundle'])

gulp.task('build-reload', ['build'], done => {
  browserSync.reload()
  done()
})

gulp.task('reload', () => browserSync.reload())

gulp.task('serve', done => {
  browserSync.init({server: './'})
  done()
})

gulp.task('watch', ['serve'], () => {
  gulp.watch(path.join(paths.src, '**'), ['build-reload'])
})

