'use strict';

var bodyparser = require('body-parser');

module.exports = function (app, User, testing) { 

	if(testing) {
		app.use(bodyparser.json());

		app.post('/user', function(req, res) {
			console.dir(req);
			User.create({
				username: req.body.username,
				displayName: req.body.displayName
				//provider: 'twitter.com'
			}).then(function(user) {
				res.json(user);
			},
			function(err) {
				res.status(500).send({'msg': 'could not create user ' + err});
			});
		});

		app.get('/user/:username', function(req, res) {
			User.find({
				where: {
					username: req.params.username
				}
			}).then(function(user) {
				if(!user) return res.status(404).send({'msg': 'user ' + req.params.username + ' does not exist'});
				res.json(user);
			},
			function() {
				res.status(500).send({'msg': 'could not show user'});
			});
		});

		app.delete('/user/:username', function(req, res) {
			User.destroy({
				where: {
					username: req.params.username
				}
			}).then(function() {
				res.json({'msg': 'deleted user ' + req.body.username});
			},
			function() {
				res.status(500).send({'msg': 'could not delete user'});
			});
		});
		// In testing, disable authentication and
		// have a dummy authentication middleware
		// that does nothing
		// return function(req, res, next) {
		//  return next();
		// };
	} else {
		//returns the user calling the API
		app.get('/user', function(req, res) {
		// User was fetched from the DB during session deserialization.
			res.json(req.user);
		});

		//removes the user calling the API
		app.delete('/user', function(req, res) {
			var uname = req.user.username;
			req.logout();
			User.destroy({
				where: {
					username: uname
				}
			}).then(function() {
				res.json({'msg': 'deleted user ' + uname});
			},
			function() {
				res.status(500).send({'msg': 'could not delete user'});
			});
		});
	}
};

