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

	// /search/tv/:name
	app.get('/search/tv/:name', function(req, res) {
		MovieDB.searchTvShowsByName(req.params.name, function(error, response) {
			if(error) return res.status(404).send({'msg': 'tv show ' + req.params.name + ' does not exist'});
			res.json(response);
		});
	});

	// /search/person/:name
	app.get('/search/person/:name', function(req, res) {
		MovieDB.searchByPeople(req.params.name, function(error, response) {
			if(error) return res.status(404).send({'msg': 'person ' + req.params.name + ' does not exist'});
			res.json(response);
		});
	});
};

