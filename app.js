var express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	passport = require('passport'),
	routesApi = require('./api/routes/index');
require('./api/models/db');
require('./api/config/passport');

var app = express();
app.use(passport.initialize());
app.use('./api', routesApi);

app.use(function (err, req, res, next) {
	if (err.name === 'UnauthorizedError') {
		res.status(401);
		res.json({
			"message": err.name + ":" + err.message
		});
	}
});