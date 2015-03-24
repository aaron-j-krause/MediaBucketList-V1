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
    })
  }
}
