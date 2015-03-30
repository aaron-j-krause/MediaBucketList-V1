'use strict';
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var bucketLists = require('./lib/routers/buckets-routes');
var users = require('./lib/routers/users-routes');

var app = express();
var authHandler = require('./lib/auth/passport.js')(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') === 'test') {
  app.use('/api/v1/buckets', bucketLists);
  app.use('/api/v1/users', users);
}
else {
  app.use('/api/v1/buckets', authHandler, bucketLists);
  app.use('/api/v1/users', authHandler, users);
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    res.send(err);
  });
}

// production error handler
// no stacktraces leaked to user
if (app.get('env') === 'production') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log(err, req);
  });
}

module.exports = app;
