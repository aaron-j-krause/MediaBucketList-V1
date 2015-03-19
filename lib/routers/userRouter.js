'use strict';

var bodyparser = require('body-parser');

module.exports = function (app, User) {
	app.use(bodyparser.json());

	//creates a new user
	app.post('/user', function(req, res) {
		User.create({
			username: req.body.username,
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			password: req.body.password,
		}).then(function(user) {
			res.json(user);
		},
		function(err) {
			res.status(500).send({'msg': 'could not create user: '+ err});
		});
	});
};
