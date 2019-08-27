var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
const swagger = require("swagger-generator-express");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function (err, req, res, next) {
    res.status(err.status).json(err);
});

const options = {
    title: "swagger-generator-express",
    version: "1.0.0",
    host: "localhost:3000",
    basePath: "/",
    schemes: ["http", "https"],
    securityDefinitions: {
        Bearer: {
            description: 'Example value:- Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MmQwMGJhNTJjYjJjM',
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
        }
    },
    security: [{
        Bearer: []
    }],
    defaultSecurity: 'Bearer'
};

swagger.serveSwagger(app, "/swagger", options, {
    routePath: './src/routes/',
    requestModelPath: './src/requestModel',
    responseModelPath: './src/responseModel'
});

module.exports = app;