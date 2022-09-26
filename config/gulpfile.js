const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distPath = path.resolve(rootDir, 'dist');
const logPath = path.resolve(rootDir, 'logs');

const tsProject = ts.createProject(path.resolve(rootDir, 'tsconfig.json'));

gulp.task('typescript', () => {
  return tsProject
  .src()
  .pipe(tsProject())
  .js
  .pipe(gulp.dest(distPath));
});

gulp.task('assets', () => {
  return gulp
  .src(path.resolve(rootDir, 'src', 'assets', '**', '*.json'))
  .pipe(gulp.dest(path.resolve(distPath, 'assets')));
});

gulp.task('build-clean', () => {
  return del([distPath, logPath], { force: true });
});

gulp.task('default', gulp.series('build-clean','typescript', 'assets'), () => {
  console.log('Done');
})