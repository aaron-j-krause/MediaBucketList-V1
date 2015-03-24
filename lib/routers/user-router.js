'use strict';

var bodyparser = require('body-parser');

module.exports = function (app, User) {

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
		}).then(function(n) {
			res.json({'msg': 'deleted user ' + uname});
		},
		function() {
			res.status(500).send({'msg': 'could not delete user'});
		});
	});
};



