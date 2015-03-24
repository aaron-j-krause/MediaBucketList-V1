var Dispatcher = require('../dispatcher/dispatcher');
var constants = require('../constants')
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var movies = [];

var MovieStore = _.assign({}, EventEmitter.prototype, {
  getMovies: function() {
    return movies;
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
    }
  };

  if (!handlers[actionType]) return true;

  handlers[actionType]();
  MovieStore.emitChange();

  return true
})