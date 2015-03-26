'use strict';
var Dispatcher = require('../dispatcher/dispatcher');

module.exports = {
  testAction: function(data) {
    Dispatcher.handleAction({
      actionType: 'TEST_ACTION',
      data: data
    });
  },

  getMoviesByName: function(data) {
    Dispatcher.handleAction({
      actionType: 'MOVIE_GET_BY_NAME',
      data: data
    });
  },

  getMovieById: function(data) {
    Dispatcher.handleAction({
      actionType: 'MOVIE_GET_BY_ID',
      data: data
    });
  },

  getPeople: function(data) {
    Dispatcher.handleAction({
      actionType: 'PERSON_GET_BY_NAME',
      data: data
    });
  },

  getTvShowsByName: function(data) {
    Dispatcher.handleAction({
      actionType: 'TV_GET_BY_NAME',
      data: data
    });
  },

  getTvShowById: function(data) {
    Dispatcher.handleAction({
      actionType: 'TV_GET_BY_ID',
      data: data
    });
  },

  getSeasonByShowId: function(data) {
    Dispatcher.handleAction({
      actionType: 'TV_GET_SEASON',
      data: data
    });
  },

  getMoviesByPersonId: function(data) {
    Dispatcher.handleAction({
      actionType: 'MOVIE_GET_BY_PERSON_ID',
      data: data
    });
  },

  searchListModifyItem: function(data) {
    Dispatcher.handleAction({
      actionType: 'SEARCHLIST_MODIFY',
      data: data
    });
  },

  searchListSaveNew: function(data) {
    Dispatcher.handleAction({
      actionType: 'SEARCHLIST_SAVE',
      data: data
    });
  },

  getConfig: function(data) {
    Dispatcher.handleAction({
      actionType: 'CONFIG_GET_URL',
      data: data
    });
  }
};
