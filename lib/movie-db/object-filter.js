'use strict'

var _ = require('lodash');
//takes an array of objects as data and an array of keys
//returns an array of objects with just the passed in keys
//and their respective values
module.exports = function(data, keys) {
  return _.map(data, function(entry) {
    return _.pick(entry, keys);
  });
};
