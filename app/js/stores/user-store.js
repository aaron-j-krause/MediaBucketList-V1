'use strict';
var Dispatcher = require('../dispatcher/dispatcher');
var constants = require('../constants');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var cookies = require('cookies-js');
var request = require('superagent');

var navView = 'search';
var signedIn = false;
var lists = [];
var user = {};

var UserStore = _.assign({}, EventEmitter.prototype, {
  getSignedIn: function() {
    return signedIn;
  },

  getNavView: function() {
    return navView;
  },

  getLists: function() {
    return lists;
  },

  getUser: function() {
    return user;
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
      signedIn = true;
    },

    USER_SIGN_OUT: function() {
      console.log(cookies.get('signIn'));
      cookies.set('signIn', false);
      signedIn = false;
    },

    USER_GET_LISTS: function() {
      var id = ''; //hardcode user id here
      var url = '/api/buckets/' + id;
      request
        .get(url)
        .end(function(err, res) {
          console.log(res);
        });
    },

    USER_CHECK_VALID: function() {
      if(!data) {
        signedIn = false;
      } else {
        signedIn = true;
      }
    },

    USER_NAVIGATE: function() {
      if (data === 'lists') {
      var id = ''; //hard code user id here
      var url = '/api/v1/buckets/' + id;
      request
        .get(url)
        .end(function(err, res) {
          lists = res.body;
          navView = data;
          UserStore.emitChange();
        });
      } else {
        navView = data;
      }
    }
  };

  if (!handlers[actionType]) return true;

  handlers[actionType]();
  UserStore.emitChange();

  return true;
});

module.exports = UserStore;

