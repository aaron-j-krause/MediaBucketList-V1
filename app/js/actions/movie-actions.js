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

  getMoviesByPersonName: function(data) {
    Dispatcher.handleAction({
      actionType: 'MOVIE_GET_BY_PERSON_NAME',
      data: data
    });
  },

  getTvShowsByName: function(data) {
    Dispatcher.handleAction({
      actionType: 'TV_GET_BY_NAME',
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
    })
  }
}
