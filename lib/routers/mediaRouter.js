'use strict';

var bodyparser = require('body-parser');
var MovieDB = require('../moviedb/moviedb');

module.exports = function (app) {
	app.use(bodyparser.json());

	// /search/movie/:name
	app.get('/search/movie/:name', function(req, res) {
		MovieDB.searchMoviesByName(req.params.name, function(error, response) {
			if(error) return res.status(404).send({'msg': 'movie ' + req.params.name + ' does not exist'});
			res.json(response);
		});
	});
};



// /search/tv/:name