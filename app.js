var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', indexRouter);

// Middleware handle 200, catch 200 and forward to error handler
app.use(function(req, res, next) {
    if (res.statusCode == 200) {
        res.json({
            code: 200,
            message: 'OK',
            data: res.locals.data
        });
    } else {
        next(createError(404));
    }
});

// Middleware error handler
app.use(function (err, req, res, next) {
    // For development
    if (req.app.get('env') === 'development') {
        console.log(err);
    }

    // render the error page
    res.status(err.status || 500);
    console.log('aaa');
    res.json({
        code: err.status,
        message: err.message,
        data: []
    });
});

module.exports = app;
