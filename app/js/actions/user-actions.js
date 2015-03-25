'use strict';
var Dispatcher = require('../dispatcher/dispatcher');

module.exports = {
  signIn: function(data) {
    Dispatcher.handleAction({
      actionType: 'USER_SIGN_IN',
      data: data
    });
  },

  isValid: function(data) {
    Dispatcher.handleAction({
      actionType: 'USER_CHECK_VALID',
      data: data
    });
  }
};
