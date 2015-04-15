'use strict';

var _ = require('lodash');

var LOCAL_KEYS = ['name', 'url', 'id', 'mediaType'];

//takes an array of objects as data and an array of keys
//returns an array of objects with just the passed in keys
//and their respective values
function objectFilter(data, keys, modifier) {
  var name;
  var url;
  return _.map(data, function(entry) {
    name = entry[modifier.name];
    url = entry[modifier.url];
    entry.name = name;
    entry.url = url;
    entry.mediaType = modifier.mediaType;
    return _.pick(entry, keys);
  });
}

function setMediaType(media) {
  var hasResults = media.hasOwnProperty('results') && media.results.length;
  var hasCast = media.hasOwnProperty('cast') && media.cast.length;

  if (hasCast && !(media.cast[0].hasOwnProperty('title'))) return 'person';

  if ((hasResults && media.results[0].hasOwnProperty('video')) ||
    hasCast) return 'movie';

  if (hasResults && media.results[0].hasOwnProperty('first_air_date'))
    return 'series';

  if (media.hasOwnProperty('season_number')) return 'show';
}

function setModifier(mediaType) {
  var modifiers = {
    person: {name: 'name', url: 'profile_path'},
    movie: {name:'title', url:'poster_path'},
    series: {name: 'name', url: 'poster_path'},
    show: {name: 'name', url: 'still_path'}
  };

  var modifier = modifiers[mediaType];
  if (modifier) modifier.mediaType = mediaType;

  return modifier;
}

function setDataSet(media, mediaType) {
  if (mediaType === 'person') return media.cast;
  if (mediaType === 'series') return media.results;
  if (mediaType === 'show') return media.episodes;
  if (mediaType === 'movie')
    return media.hasOwnProperty('cast') ? media.cast : media.results;
}

module.exports = function(media) {
  var mediaType = setMediaType(media);
  var modifier = setModifier(mediaType);
  var dataSet = setDataSet(media, mediaType);
  //var parsedData = objectFilter(dataSet, LOCAL_KEYS, modifier);


  return media;
};
