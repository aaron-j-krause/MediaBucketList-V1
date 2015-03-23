'use strict';

var Sequelize = require('sequelize');

module.exports = function(sequelize) {
	var User = sequelize.define('users', {
		username: {
			type: Sequelize.STRING,
			primaryKey: true
		},
		firstname: Sequelize.STRING,
		lastname: Sequelize.STRING,
		email: Sequelize.STRING,
		password: Sequelize.STRING		
	}, {
		freezeTableName: true
	});
	return User;
};