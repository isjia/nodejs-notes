require('shelljs/global')

var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

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

gulp.task('default', ['gitbook', 'deploy-to-gh-pages']);
