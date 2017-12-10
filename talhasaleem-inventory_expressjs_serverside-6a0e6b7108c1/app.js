var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// JSON Web Token

var express_jwt = require('express-jwt');
var jwt = require('jsonwebtoken');

var index = require('./routes/index');
var signUp = require('./routes/signup');
var login = require('./routes/login');
var users = require('./routes/users');
var branches = require('./routes/branches');
var all_companies = require('./routes/all_companies');
var accounts = require('./routes/accounts');
var stock_order = require('./routes/stock_order');
var invoices = require('./routes/invoices');

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

// JWT Middleware

app.use(express_jwt({
    secret: 'enigmaparadigm'
}).unless({
    path: [
        '/login'
    ]
}));

// CORS middleware

app.all('/*', function (req, res, next) {
    // CORS Headers
    res.header("Access-Control-Allow-Origin", "*"); // Restrict it to the required domain
    res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE,OPTIONS");
    // set custom headers for CORS
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Access-Token,-Key,token, Authorization");
    if(req.method == 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
});

app.use('/', index);
app.use('/signup', signUp);
app.use('/login', login);
app.use('/users', users);
app.use('/branches', branches);
app.use('/all_companies', all_companies);
app.use('/accounts', accounts);
app.use('/stock_order', stock_order);
app.use('/invoices', invoices);

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
