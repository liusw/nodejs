var express = {

    init: function () {
        var express = M.express;
        //var minify = require('express-minify');
        var app = express();
        //压缩
        //app.use(minify());
        //app.use(minify({cache: __dirname + '/cache'}));
        //缓存 临时上传路径
        //app.use(express.bodyParser({uploadDir: C.root + '/runtime/images'}));
        //模版
        //app.engine('html', require('ejs').__express);
        app.engine('html', require('ejs').renderFile);
        //app.engine('html', require('artnode'));
        app.set('views', C.view);
        //应用配置
        //app.configure(function () {
            //模版全局路径
            /*app.helpers({config: config})*/
            app.use(express.favicon(C.static + C.favicon));
            app.use(express.logger('dev'));
            //app.use(express.bodyParser());
            app.use(express.json());
            app.use(express.urlencoded());
            app.use(express.cookieParser(C.secret));//增加cookie支持
            /*app.use(express.cookieSession({
               secret: 'KenSecret'
               ,key: 'KenCookie'
               ,cookie: { path: '/', maxAge: 1000 * 60 * 60 * 24 * 30}//30 days{ path: '/', httpOnly: true, maxAge: null }

            }));*/
            app.use(express.methodOverride());
            app.use(express.static(C.static));//先声明静态环境 再设置路由 防止静态文件被路由解析了
            app.use(app.router);//设置路由

            //app.disable('x-powered-by');//屏蔽x-powered-by

        //});
        //开发模式
        //app.configure('development', function () {
        if('development' == app.get('env')){
            app.use(express.errorHandler());
        }
        //});
        //产品模式
        //app.configure('production', function(){
        if('production' == app.get('env')){
            //var oneYear = 31557600000;
            //app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
            app.use(express.errorHandler());
        }
        //});

        return app;
    }
}
module.exports = express;