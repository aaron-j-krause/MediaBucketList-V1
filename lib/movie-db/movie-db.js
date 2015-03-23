'use strict';

var request = require('request');
var keys = require('../../lib/keys/keys');

var API_KEY = keys.THEMOVIEDB_APIKEY;

var MovieDB = function() {};

MovieDB.prototype.searchMoviesByName = function(name, callback) {
	var options = {
	  url: 'http://api.themoviedb.org/3/search/movie',
	  json: true,
	  headers: {
	    'Accept': 'application/json'
	  },
	  qs: {
	  	api_key: API_KEY,
	  	query: name
	  }
	};

	request(options, function (error, response, body) {
		if(error) { 
			return callback(error);
		} else {
			var output = [];	
			for(var i = 0; i < body.results.length; i++) {
				output[i] = {
					title: body.results[i].title, 
					vote_average: body.results[i].vote_average,
					id: body.results[i].id
				}; 
			}
			return callback(null, output);
		}
	});
};

MovieDB.prototype.searchTvShowsByName = function(name, callback) {
	var options = {
	  url: 'http://api.themoviedb.org/3/search/tv',
	  json: true,
	  headers: {
	    'Accept': 'application/json'
	  },
	  qs: {
	  	api_key: API_KEY,
	  	query: name
	  }
	};

	request(options, function (error, response, body) {
		if(error) { 
			return callback(error);
		} else {
			var output = [];	
			for(var i = 0; i < body.results.length; i++) {
				output[i] = {
					title: body.results[i].name, 
					vote_average: body.results[i].vote_average,
					id: body.results[i].id
				}; 
			}
			return callback(null, output);
		}
	});
};

MovieDB.prototype.searchByPeople = function(name, callback) {
	var options = {
	  url: 'http://api.themoviedb.org/3/search/person',
	  json: true,
	  headers: {
	    'Accept': 'application/json'
	  },
	  qs: {
	  	api_key: API_KEY,
	  	query: name
	  }
	};

	request(options, function (error, response, body) {
		console.dir(body);
		if(error) { 
			return callback(error);
		} else {
			var output = [];	
			for(var i = 0; i < body.results.length; i++) {
				output[i] = {
					name: body.results[i].name, 
					id: body.results[i].id
				}; 
			}
			return callback(null, output);
		}
	});
};

module.exports = new MovieDB();