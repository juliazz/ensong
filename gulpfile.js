const gulp = require('gulp')
const gulpLoadPlugins = require('gulp-load-plugins')
const plugins = gulpLoadPlugins()



// gulp.task('testCssmin', function () {
//     gulp.src('css/*.css')
//         .pipe(base64())
//         // .pipe(rev())               //文件名加md5后缀
//         .pipe(cssmin())
//         // .pipe(rev.manifest())　　　　　　　　 //rev-mainfest.json文件，里面是压缩文件的信息
//         .pipe(gulp.dest('dist/css'));
// });



// Compile less
gulp.task('compile:wxss', () => {
    return gulp.src(['components/**/*.wxss'])
        .pipe(plugins.base64({
            extensions: ['svg', 'png', /\.jpg#datauri$/i],
            exclude: [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
            maxImageSize: 8 * 1024,
            deleteAfterEncoding: false,
            debug: true
        }))
        .pipe(gulp.dest('app/css'))
})
