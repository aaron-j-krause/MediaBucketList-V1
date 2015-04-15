'use strict';

var _ = require('lodash');
//takes an array of objects as data and an array of keys
//returns an array of objects with just the passed in keys
//and their respective values
function objectFilter(data, keys, modifiers) {
  var name;
  var url;
  return _.map(data, function(entry) {
    name = entry[modifiers.name];
    url = entry[modifiers.url];
    entry.name = name;
    entry.url = url;
    entry.mediaType = modifiers.mediaType;
    return _.pick(entry, keys);
  });
}

function setMediaType(media) {
  var hasResults = media.hasOwnProperty('results') && media.results.length;
  var hasCast = media.hasOwnProperty('cast') && media.cast.length;

  if (hasCast && !(media.cast[0].hasOwnProperty('title'))) return 'person';

  if ((hasResults && media.results[0].hasOwnProperty('video'))
    || hasCast) return 'movie';

  if (hasResults && media.results[0].hasOwnProperty('first_air_date'))
    return 'series';

  if (media.hasOwnProperty('season_number')) return 'show';
}

module.exports = function(media) {
  console.log('IN PARSER', media);
  console.log('mediatype function', setMediaType(media));
  var LOCAL_KEYS = ['name', 'url', 'id', 'mediaType'];
  var mod = {};
  var data;
  if(media.hasOwnProperty('cast')) {
    if (media.cast[0] && !(media.cast[0].hasOwnProperty('title'))) {
      mod.name = 'name';
      mod.url = 'profile_path';
      mod.mediaType = 'person';
      data = objectFilter(media.cast, LOCAL_KEYS, mod);
    } else {
      mod.name = 'title';
      mod.url = 'poster_path';
      mod.mediaType = 'movie';
      data = objectFilter(media.cast, LOCAL_KEYS, mod);

    }
    console.log('IF IN PARSER CAST', data);
  } else if (media.results && media.results.length &&
      media.results[0].hasOwnProperty('video')) {
    mod.name = 'title';
    mod.url = 'poster_path';
    mod.mediaType = 'movie';
    data = objectFilter(media.results, LOCAL_KEYS, mod);
    console.log('ELIF IN PARSER MOVIE', data);
  } else if (media.results && media.results.length && 
      media.results[0].hasOwnProperty('first_air_date')) {
    mod.name = 'name';
    mod.url = 'poster_path';
    mod.mediaType = 'series';
    data = objectFilter(media.results, LOCAL_KEYS, mod);
    console.log('ELIF IN PARSER SERIES', data);
  } else if (media.hasOwnProperty('season_number')) {
    mod.name = 'name';
    mod.url = 'still_path';
    mod.mediaType = 'show';
    data = objectFilter(media.episodes, LOCAL_KEYS, mod);
    console.log('ELIF IN PARSER SHOW', data);
  }

  return media;
};
