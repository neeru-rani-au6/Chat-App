var createError = require('http-errors');
var express = require('express');
var path = require('path');
require("dotenv").config();
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("./models/mongo");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var requestRouter = require('./routes/request');
var groupRouter = require("./routes/group");
var chatRouter = require("./routes/chat");
var singleChat = require("./routes/single");
const cors = require("cors");

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true, limit: '500mb' }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/request', requestRouter);
app.use("/group", groupRouter);
app.use('/chat', chatRouter);
app.use('/single', singleChat)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
