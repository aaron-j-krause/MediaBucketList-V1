'use strict';

var constants = require('../constants');
var session = require('express-session');

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function(app, User, testing) {
	if (testing) {
		// In testing, disable authentication and
		// have a dummy authentication middleware
		// that does nothing
		return function(req, res, next) {
			return next();
		};
	}
	// Enable session management by express
	app.use(session({secret: 'changethis!'}));

	app.use(passport.initialize());
	// Enable sessions
	app.use(passport.session());

	passport.use(new TwitterStrategy({
		consumerKey: constants.TWITTER_CONSUMER_KEY,
		consumerSecret: constants.TWITTER_CONSUMER_SECRET,
		callbackURL: "http://localhost:3000/auth/twitter/callback"
	},
	function(token, tokenSecret, profile, done) {
		// Could be an existing user or a new user
		// profile.username is used as the username
		User.findOrCreate({
			where: {
				username: profile.username,
				displayName: profile.displayName
			}
		}).spread(function(user, created) {
			return done(null, user);
		});
	}));

	// This just stores the username is an encrypted browser cookie
	passport.serializeUser(function(user, done) {
		done(null, user.username);
	});

	// This fetches the user by username retrieved from the
	// cookie that was set during serializeUser
	passport.deserializeUser(function(uname, done) {
		User.find({
			where: {
				username: uname
			}
		}).then(function(user) {
			if (!user) return done(new Error('Invalid user'));
			return done(null, user);
		});
	});

	// Redirect the user to Twitter for authentication.  When complete, Twitter
	// will redirect the user back to the application at
	//   /auth/twitter/callback
	app.get('/auth/twitter', passport.authenticate('twitter'));

	// Twitter will redirect the user to this URL after approval.  Finish the
	// authentication process by attempting to obtain an access token.  If
	// access was granted, the user will be logged in.  Otherwise,
	// authentication has failed.
	app.get('/auth/twitter/callback', passport.authenticate('twitter', {
		successRedirect: '/api/user',
		failureRedirect: '/auth/twitter'
	}));

	// This is the middleware that needs to be used for
	// protecting APIs that require authorization
	return function(req, res, next) {
	    // if user is authenticated in the session, carry on
	    if (req.isAuthenticated())
	        return next();

	    // if they aren't redirect them to the login page
	    res.redirect('/auth/twitter');
	};
};
