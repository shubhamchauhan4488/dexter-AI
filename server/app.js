require('dotenv').config()
var cors = require('cors')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var chatbotRouter = require('./routes/chatbot');
const rateLimiter = require('./middlewares/rateLimiter');

var app = express();
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const { enforceQuotas, reset} = rateLimiter();
// Apply middleware to all routes
app.use(enforceQuotas);
// Reset counters every hour
reset()

// test route
app.use('/', indexRouter);
// chatbot and elasticsearch route
app.use('/chatbot', chatbotRouter);

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
