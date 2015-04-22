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
      var username = cookies.get('username');
      var url = '/api/v1/users/' + username;
      request
        .get(url)
        .end(function(err, res) {
          user.id = res.body.id;
          user.username = res.body.username;
          request
            .get('/api/v1/buckets/' + user.id)
            .end(function(err, res) {
              lists = res.body;
              signedIn = true;
            });
       });
     },

    USER_SIGN_OUT: function() {
      cookies.set('signIn', false);
      cookies.expire('signIn');
      cookies.expire('username');
      signedIn = false;
      user = {};
    },

    USER_GET_LISTS: function() {
      var id = user.id;
      var url = '/api/buckets/' + id;
      request
        .get(url)
        .end(function(err, res) {
          lists = res.body;
          UserStore.emitChange();
        });
    },

    PROFILE_LIST_MODIFY: function() {
      console.log('in USER store FOR MODIFY', lists, data);
      lists.forEach(function(list) {
        if (list.id === data.listId) {
          list.subjectInfo.forEach(function(movie) {
            if (movie.id === data.id) {
              movie.watched = data.watched;
              return
            }
          });
        }
      })
    },

    PROFILE_LIST_SAVE: function() {
      console.log('in USER store', data);
      request
        .put('/api/v1/buckets/')
        .send({
          id: data.listId,
          subjectInfo: data.listData
        })
        .end(function(err, res) {
          console.log(err, res.body);
          console.log('MAAAADE IT');
        })
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
      var id = user.id;
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

