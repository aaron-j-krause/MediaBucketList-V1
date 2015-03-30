'use strict';
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var models = require('../models');
var constants = (process.env.NODE_ENV === 'production') ? null : require('../constants');

passport.use(new TwitterStrategy({
    consumerKey: constants.TWITTER_CONSUMER_KEY,
    consumerSecret: constants.TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function (token, tokenSecret, profile, done) {
    // Could be an existing user or a new user
    // profile.username is used as the username
    models.user.findOrCreate({
      where: {
        username: profile.username,
        displayName: profile.displayName
      }
    }).spread(function (user) {
      return done(null, user);
    });
  }
));