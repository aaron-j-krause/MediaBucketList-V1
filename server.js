'use strict';

var express = require('express');
var Sequelize = require('sequelize');

var app = express();

var sequelize = new Sequelize('apptest', null, null, {
	dialect: 'postgres',
	port: 5432
});

var userModel = require('./lib/userModel')(sequelize);

//routes
var userRouter = express.Router();
require('./lib/routers/userRouter')(userRouter, userModel);
//var movieRouter = express.Router();
//var tvRouter = express.Router();

app.use('/api', userRouter);

sequelize.sync().then(function() {
	var port = process.env.PORT || 3000;
	return app.listen(port, function() {
		console.log('server listening on port ' + port);
	});
});