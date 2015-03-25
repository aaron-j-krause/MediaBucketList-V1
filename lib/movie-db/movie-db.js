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
			if (err) return callback(err);
			callback(null, res.body);
		});
}

exports.searchMoviesByName = function(name, callback) {

 	var url = 'http://api.themoviedb.org/3/search/movie';

	makeRequest(url, name, callback);
};


exports.searchTvShowsByName = function(name, callback) {

	var url = 'http://api.themoviedb.org/3/search/tv';

	makeRequest(url, name, callback);
};

exports.searchByPeople = function(name, callback) {

	var url = 'http://api.themoviedb.org/3/search/person';

	makeRequest(url, name, callback);
};

exports.searchByPersonId = function(id, callback) {
	var url = 'http://api.themoviedb.org/3/person/' + id + '/combined_credits';

	makeRequest(url, null, callback);
};

exports.searchByMovieId = function(id, callback) {
	var url = 'http://api.themoviedb.org/3/movie/' + id + '/credits';

	makeRequest(url, null, callback);
};

exports.searchByTvSeason = function(id, number, callback) {
	var url = 'http://api.themoviedb.org/3/tv/' + id + '/season/' + number;

	makeRequest(url, null, callback);
};

exports.searchTvById = function(id, callback) {
	var url = 'http://api.themoviedb.org/3/tv/' + id;

	makeRequest(url, null, callback);
};
