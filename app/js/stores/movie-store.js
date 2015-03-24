var Dispatcher = require('../dispatcher/dispatcher');
var constants = require('../constants')
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var MovieAPI = require('../../../lib/movie-db/movie-db')

var movies = [];
var list = [];

var MovieStore = _.assign({}, EventEmitter.prototype, {
  getMovies: function() {
    return movies;
  },

  getList: function() {
    return list;
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback)
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
      })
    },

    MOVIE_GET_BY_PERSON_NAME: function() {
      MovieAPI.searchByPeople(data, function(err, res) {
        if (err) return console.log(err);
        movies = res.results;
        MovieStore.emitChange();
      })
    },

    TV_GET_BY_NAME: function() {
      MovieAPI.searchTvShowsByName(data, function(err, res) {
        if (err) return console.log(err);
        movies = res.results;
        MovieStore.emitChange();
      })
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
      console.log('THIS IS WHERE WE WILL SAVE THE LIST', data)
      list = [];
      MovieStore.emitChange();
    }
  };

  if (!handlers[actionType]) return true;

  handlers[actionType]();

  return true
});

module.exports = MovieStore;