'use strict';

var passport = require('passport');
var constants = require('../constants');
var session = require('express-session');
var models = require('../models');
var strategies = require('./strategies');

module.exports = function (app, testing) {
  if (testing) {
    // In testing, disable authentication and
    // have a dummy authentication middleware
    // that does nothing
    return function (req, res, next) {
      return next();
    };
  }
  // Enable session management by express
  app.use(session({
    secret: constants.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  // Enable sessions
  app.use(passport.session());

  // This just stores the username in an encrypted browser cookie
  passport.serializeUser(function (user, done) {
    done(null, user.username);
  });

  // This fetches the user by username retrieved from the
  // cookie that was set during serializeUser
  passport.deserializeUser(function (uname, done) {
    models.user.find({
      where: {
        username: uname
      }
    }).then(function (user) {
      if (!user) return done(new Error('Invalid user'));
      return done(null, user);
    });
  });

  // Redirect the user to Twitter for authentication. When complete, Twitter
  // will redirect the user back to the application at /auth/twitter/callback
  app.get('/auth/twitter', passport.authenticate('twitter'));

  // Twitter will redirect the user to this URL after approval. Finish the
  // authentication process by attempting to obtain an access token. If access
  // was granted, the user will be logged in. Otherwise, authentication has failed.
  app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/api/v1/users',
    failureRedirect: '/auth/twitter'
  }));

  // This is the middleware that needs to be used for
  // protecting APIs that require authorization
  return function (req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();

	//TODO use cookie middleware
	app.use(cookieParser());
	// Twitter will redirect the user to this URL after approval. Finish the
	// authentication process by attempting to obtain an access token. If access 
	// was granted, the user will be logged in. Otherwise, authentication has failed.
	app.get('/auth/twitter/callback', 
		passport.authenticate('twitter', {failureRedirect: '/'}), 
		function(req, res) {
			res.cookie('signIn','true');
		    res.redirect('/');
		}
	);
	// This is the middleware that needs to be used for
	// protecting APIs that require authorization
	return function(req, res, next) {
	    // if user is authenticated in the session, carry on
	    if (req.isAuthenticated())
	        return next();

	    // if they aren't redirect them to the login page /auth/twitter
	    res.redirect('/auth/twitter');
	};
};
