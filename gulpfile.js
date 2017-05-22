/**
 * Created by yyl on 2017/3/13.
 */
var gulp=require('gulp');
var sass=require('gulp-ruby-sass');//编译sass
var connect=require('gulp-connect');//即时更新
var uglify=require('gulp-uglify');//压缩JS
var rename=require('gulp-rename');//重命名
var concat=require('gulp-concat');//合并文件

//css编译
gulp.task('mysass',function () {
    sass('./sass/*.scss',{
        style:'compressed'
    }).pipe(gulp.dest('./css'))

});

//创建一个实时更新任务
gulp.task('autorefresh',function () {
    gulp.src('./html/*.html').pipe(connect.reload());
});

//压缩JS
gulp.task("js", function(){
    //common压缩
    gulp.src('./js/my_project_js/*.js').pipe(uglify()).pipe(concat('plug.min.js')).pipe(gulp.dest('../js-min'))
});

//监听任务
gulp.task('mywatch',function () {
    gulp.watch('./sass/*.scss',['mysass']);

    connect.server({
        livereload:true
    });
    gulp.watch('./html/*.html',['autorefresh']);
    gulp.watch('./js/*.js',['js'])
});