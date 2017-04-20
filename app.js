var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');//session中间件
var about = require('./routes/about');
var index = require('./routes/index');
var users = require('./routes/users');
var cate = require('./routes/cate');
var goods = require('./routes/goods');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//配置session和cookie
app.use(cookieParser('sessiontest'));
app.use(session({
    secret:'sessiontest', //名字与cookieParser中的保持一致
    resave:true,
    saveUninitialized: true
}));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/about', about);
app.use('/cate', cate);
app.use('/goods', goods);



// 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
	console.log(req.params);
  	if(req.params.id == '111'){
  		console.log(11);
  		next('route');
  	}else{
  		next();
  	}
}, function(req, res, next) {
	res.send('常规页面');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
