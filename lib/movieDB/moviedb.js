'use strict';

var request = require('request');
var API_KEY = '619aec7a289a6cb463682dbfd621b913';

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
					vote_average: body.results[i].vote_average
				}; 
			};
			return callback(null, output);
		};
	});
};

module.exports = new MovieDB();