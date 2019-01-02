var gulp=require('gulp');
var sass=require('gulp-sass');
var uglify=require('gulp-uglify');
var concat=require('gulp-concat');
var server=require('gulp-webserver');
var fs=require('fs');
var path=require('path');
var url=require('url');
var mincss=require('gulp-clean-css');

  //编译sass
  gulp.task('css',function(){
       return gulp.src('./src/sass/*.scss')
              .pipe(sass())
              .pipe(concat('all.css'))
              .pipe(mincss())
              .pipe(gulp.dest('./src/css/'))
  })
  //监听sass
  gulp.task('watch',function(){
      return gulp.src('./src/sass/*.scss',gulp.series('css'))
  })
    //压缩js
    gulp.task('minJs',function(){
        return gulp.src('./src/js/index.js')
               .pipe(uglify())
               .pipe(gulp.dest('./dist/js/'))
    })
  //起服务
  gulp.task('dev',function(){
      return gulp.src('./src')
             .pipe(server({
                 port:9090,
                 middleware:function(req,res,next){
                     var pathname=url.parse(req.url).pathname;
                     if(pathname==='/favicon.ico'){
                         return res.end('')
                     }
                      console.log(pathname)
                     pathname=pathname==='/'?'index.html':pathname;
                    
                     res.end(fs.readFileSync(path.join(__dirname,'src',pathname)))
                 }
             }))
  })

   gulp.task('default',gulp.series('css','minJs','dev','watch'))
   

  
  