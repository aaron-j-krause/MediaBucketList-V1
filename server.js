'use strict';

var starter = function(testing, callback) {
	var express = require('express');
	var Sequelize = require('sequelize');

	var app = express();

	var sequelize = new Sequelize(testing ? 'mediabucketlist-test': 'apptest', 'mediabucketlist', 'changemenow', {
		dialect: 'postgres',
		port: 5432
	});

	var userModel = require('./lib/models/user-model')(sequelize);
	var auth_handler = require('./lib/auth/passport.js')(app, userModel, testing);

	//routes
	var userRouter = express.Router();
	var mediaRouter = express.Router();
	require('./lib/routers/user-router')(userRouter, userModel, testing);
	require('./lib/routers/media-router')(mediaRouter);

	// all routes under /api require authentication
	app.use('/api', auth_handler, userRouter);
	app.use('/api', auth_handler, mediaRouter);
	app.use(express.static(__dirname + '/build'));

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