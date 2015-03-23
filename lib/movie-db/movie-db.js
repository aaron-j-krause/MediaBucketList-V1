'use strict';

module.exports = exports = {};

var request = require('superagent');
var constants = require('../../lib/constants');

var API_KEY = constants.THEMOVIEDB_APIKEY;

function makeRequest(url, query, callback) {
	request
		.get(url)
		.query({api_key: API_KEY})
		.query({query: query})
		.end(function(err, res) {
			callback(err, res, res.body);
		});
}

exports.searchMoviesByName = function(name, callback) {

 	var url = 'http://api.themoviedb.org/3/search/movie';

	makeRequest(url, name, function(err, res) {
		if (err) {
			return callback(err);
		} else {
			var output = [];
			for(var i = 0; i < res.body.results.length; i++) {
				output[i] = {
					title: res.body.results[i].title, 
					vote_average: res.body.results[i].vote_average,
					id: res.body.results[i].id
				}; 
			}
			return callback(null, output);
		}
	});
};


exports.searchTvShowsByName = function(name, callback) {

	var url = 'http://api.themoviedb.org/3/search/tv';

	makeRequest(url, name, function (err, res) {
		if (err) { 
			return callback(err);
		} else {
			var output = [];
			for(var i = 0; i < res.body.results.length; i++) {
				output[i] = {
					title: res.body.results[i].name, 
					vote_average: res.body.results[i].vote_average,
					id: res.body.results[i].id
				}; 
			}
			return callback(null, output);
		}
	});
};

exports.searchByPeople = function(name, callback) {

	var url = 'http://api.themoviedb.org/3/search/person';

	makeRequest(url, name, function (err, res) {
		if (err) { 
			return callback(err);
		} else {
			var output = [];	
			for(var i = 0; i < res.body.results.length; i++) {
				output[i] = {
					name: res.body.results[i].name, 
					id: res.body.results[i].id
				}; 
			}
			return callback(null, output);
		}
	});
};
