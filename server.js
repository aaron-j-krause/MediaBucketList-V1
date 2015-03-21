'use strict';

var starter = function(testing, callback) {
	var express = require('express');
	var Sequelize = require('sequelize');
	var app = express();

	var sequelize = new Sequelize(testing ? 'backendTest': 'apptest', null, null, {
		dialect: 'postgres',
		port: 5432
	});

	var userModel = require('./lib/models/userModel')(sequelize);

	//routes
	var userRouter = express.Router();
	require('./lib/routers/userRouter')(userRouter, userModel);
	//var movieRouter = express.Router();
	//var tvRouter = express.Router();

	app.use('/api', userRouter);

	sequelize.sync({force: testing}).then(function() {
		var port = process.env.PORT || 3000;
		return app.listen(port, function() {
			console.log('server listening on port ' + port);
			if(callback) {
				callback(app);
			}
		});
	});
};

if(!module.parent) {
	//running as main
	starter(false);
} else {
	module.exports = starter;
}