'use strict';

var Sequelize = require('sequelize');

module.exports = function(sequelize) {
	var User = sequelize.define('users', {
		username: {
			type: Sequelize.STRING
		},
		displayName: Sequelize.STRING
	}, {
		freezeTableName: true
	});
	return User;
};