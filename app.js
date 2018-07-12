var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./server/db');
var index = require('./routes/index');
var user = require('./routes/user');
var course = require('./routes/course');

var session = require('express-session');
var MongoStore  = require('connect-mongo')(session);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'test',
  key: 'test',
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: 'mongodb://localhost:27017/test'
  })

}));

app.use('/', index);
app.use('/user', user);
app.use('/course', course);

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

// module.exports = app;
// =>
var debug = require('debug')('my-application'); // debug模块  
app.set('port', process.env.PORT || 3000); // 设定监听端口  
var server = app.listen(app.get('port'), function() {//启动监听  
  debug('Express server listening on port ' + server.address().port);  
}); 
