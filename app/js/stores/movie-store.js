'use strict';
var Dispatcher = require('../dispatcher/dispatcher');
var constants = require('../constants');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var MovieAPI = require('../api/movie-db');
var request = require('superagent');
var cookies = require('cookies-js');

var movies = [];
var listType = 'movies';
var list = [];
var session = true;
var imageUrl = '';
var testList = [];
var sublist = [];

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

  getSubList: function() {
    return sublist;
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

    TV_GET_SHOW_BY_ID: function() {
      MovieAPI.searchTvById(data, function(err, res) {
        if (err) return console.log(err);
        var show = res;
          movies = [];
          for (var i = 0; i < show.seasons.length; i++) {
            movies.push({
              show: {
                name: show.name,
                id: show.id
              },
              name: 'Season ' + i,
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
        console.log(res);
      });
    },

    SEARCHLIST_MODIFY: function() {
      if(!data.movie.show){  
        if (data.checked) {
          data.movie.watched = false;
          list.push(data.movie);
        } else {
          var index = list.indexOf(data.movie);
          list.splice(index, 1);
        }
      }

      if(data.movie.show){
        var show = data.movie.show.id;
        var seasonNumber = data.movie.id;
        MovieAPI.searchByTvSeason(show, seasonNumber, function(err, res) {
          if(err) return console.log(err);
          sublist[seasonNumber] = res.episodes;
          MovieStore.emitChange();
        });

      } else {
        MovieStore.emitChange();
      }
    },

    SEARCHLIST_SAVE: function() {
      var user = cookies.get('username');
      var type = '';
      var id;

      request
        .get('/api/v1/users/' + user)
        .end(function(err, res) {
          if (err) return console.log(err);
          id = res.body.id;
          request
            .post('/api/v1/buckets/')
            .send({
              username: user,
              userId: id,
              listType: type,
              subjectId: '666',
              subjectInfo: data
            })
            .end(function(err) {
              if (err) return console.log(err);
              testList = data;
              listType = 'movies';
              list = [];
              movies = [];
              sublist = [];
              MovieStore.emitChange();
            });
        });

    },

    CONFIG_GET_URL: function() {
      MovieAPI.getConfig(function(err, res) {
        if (err) return console.log(err);
        var baseUrl = res.images.secure_base_url;
        var imageSize = res.images.poster_sizes[0];
        imageUrl = baseUrl + imageSize;
        MovieStore.emitChange();
      });
    }
  };

  if (!handlers[actionType]) return true;

  handlers[actionType]();

  return true;
});

module.exports = MovieStore;
