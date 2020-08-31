var passport = require('passport'),
	mongoose = require('mongoose'),
	User = require('../models/users');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
		usernameField: 'email'
	},
	function (username, password, done) {
		User.findOne({
			email: username
		}, function (err, user) {
			if (err) {
				return done(err);
			}
			if (!user) { // Return if user not found in database
				return done(null, false, {
					message: 'User not found'
				});
			}
			if (!user.validPassword(password)) { // Return if password is wrong
				return done(null, false, {
					message: 'Password is wrong'
				});
			}
			return done(null, user); // If credentials are correct, return the user object
		});
	}
));