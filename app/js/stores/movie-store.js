'use strict';
var Dispatcher = require('../dispatcher/dispatcher');
var constants = require('../constants');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var MovieAPI = require('../../../lib/movie-db/movie-db');

var movies = [];
var listType = 'movies';
var list = [];
var session = true;
var imageUrl = '';
var testList = [];

var MovieStore = _.assign({}, EventEmitter.prototype, {
  getMovies: function() {
    return movies;
  },

  getListType: function() {
    return listType;
  },

  getList: function() {
    return list;
  },

  getTestList: function() {
    return testList;
  },

  getSession: function() {
    return session;
  },

  getImageData: function() {
    return imageUrl;
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

Dispatcher.register(function(payload) {
  var actionType = constants[payload.action.actionType];
  var data = payload.action.data;

  var handlers = {
    TEST_ACTION: function() {
      console.log('hello');
    },

    MOVIE_GET_BY_NAME: function() {
      MovieAPI.searchMoviesByName(data, function(err, res) {
        if (err) return console.log(err);
        movies = res.results;
        MovieStore.emitChange();
      });
    },

    MOVIE_GET_BY_ID: function() {
      MovieAPI.searchByMovieId(data, function(err, res) {
        if (err) return console.log(err);
        listType = 'actors';
        movies = res.cast;
        MovieStore.emitChange();
      });
    },

    MOVIE_GET_BY_PERSON_ID: function() {
      MovieAPI.searchByPersonId(data, function(err, res) {
        if (err) return console.log(err);
        movies = res.cast;
        listType = 'searchlist';
        MovieStore.emitChange();
      });
    },

    PERSON_GET_BY_NAME: function() {
      MovieAPI.searchByPeople(data, function(err, res) {
        if (err) return console.log(err);
        movies = res.results;
        MovieStore.emitChange();
      });
    },

    TV_GET_BY_NAME: function() {
      MovieAPI.searchTvShowsByName(data, function(err, res) {
        if (err) return console.log(err);
        movies = res.results;
        listType = 'tv';
        MovieStore.emitChange();
      });
    },

    TV_GET_SEASON: function() {
      MovieAPI.searchTvById(data, function(err, res) {
        if (err) return console.log(err);
        movies = [];
        for (var i = 0; i < res.seasons.length; i++) {
          movies.push({
            show: {
              name: res.name,
              id: res.id
            },
            name: i,
            id: i,
            watched: false
          });
        }
        listType = 'searchlist';
        MovieStore.emitChange();
      });
    },

    TV_GET_BY_ID: function() {
      MovieAPI.searchTvById(data, function(err, res) {
        if (err) return console.log(err);
        console.log('TVID', res);
      });
    },

    SEARCHLIST_MODIFY: function() {
      if (data.checked) {
        data.movie.watched = false;
        list.push(data.movie);
      } else {
        var index = list.indexOf(data.movie);
        list.splice(index, 1);
      }
      MovieStore.emitChange();
    },

    SEARCHLIST_SAVE: function() {
      console.log('THIS IS WHERE WE WILL SAVE THE LIST', data);
      testList = data;
      listType = 'movies';
      list = [];
      movies = [];
      MovieStore.emitChange();
    },

    CONFIG_GET_URL: function() {
      MovieAPI.getConfig(function(err, res) {
        if (err) return console.log(err);
        console.log('CONFIG', res);
        var baseUrl = res.images.secure_base_url;
        var imageSize = res.images.poster_sizes[0];
        imageUrl = baseUrl + imageSize;
        console.log('image URL', imageUrl);
        MovieStore.emitChange();
      });
    }
  };

  if (!handlers[actionType]) return true;

  handlers[actionType]();

  return true;
});

module.exports = MovieStore;
