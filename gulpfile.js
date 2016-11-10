require('shelljs/global')

var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var browserSync = require('browser-sync').create();

gulp.task('deploy-to-gh-pages', function(){
  return gulp.src('./notes/_book/**/*')
    .pipe(ghPages());
});

gulp.task('gitbook', function(){
  if(exec('npm run build').code != 0){
    echo('Error: generate gitbook failed');
    exit(1);
  }
});

gulp.task('serve', function(){
  if(exec('npm run build').code != 0){
    echo('Error: open gitbook failed');
    exit(1);
  }
  browserSync.init({
    server: {
      baseDir: './notes/_book'
    }
  });
  gulp.watch(['./notes/**/*.md'], ['gitbook']);
  gulp.watch(['./notes/_book/**/*.html']).on('change', browserSync.reload);
});

gulp.task('publish', ['gitbook', 'deploy-to-gh-pages']);
gulp.task('default', ['serve']);

