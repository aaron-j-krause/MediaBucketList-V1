'use strict';
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var models = require('../models');
var constants = require('../constants');

var twitterKey = process.env.TWITTER_CONSUMER_KEY || constants.TWITTER_CONSUMER_KEY;
var twitterSecret = process.env.TWITTER_CONSUMER_SECRET || constants.TWITTER_CONSUMER_SECRET;
var twitterCallback = process.env.TWITTER_REDIRECT_URL || "http://localhost:3000/auth/twitter/callback";

passport.use(new TwitterStrategy({
    consumerKey: twitterKey,
    consumerSecret: twitterSecret,
    callbackURL: twitterCallback
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