'use strict';
var Dispatcher = require('../dispatcher/dispatcher');
var constants = require('../constants');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var session = true;
var signedIn = false;

var UserStore = _.assign({}, EventEmitter.prototype, {
  getSignedIn: function() {
    return signedIn;
  },

  getSession: function() {
    return session;
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
  var data = payload.action.data;
  var actionType = constants[payload.action.actionType];

  var handlers = {
    USER_SIGN_IN: function() {
      //data.username = usernamed, data.password = password;
      console.log('sign in made it', data);
      signedIn = true;
    }
  };

  if (!handlers[actionType]) return true;

  handlers[actionType]();
  UserStore.emitChange();

  return true;
});

module.exports = UserStore;

