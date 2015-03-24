var Dispatcher = require('../dispatcher/dispatcher');

module.exports = {
  testAction: function(data) {
    Dispatcher.handleAction({
      actionType: 'TEST_ACTION',
      data: data
    });
  }
}
