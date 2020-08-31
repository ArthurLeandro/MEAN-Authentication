const {
	json
} = require('body-parser');

var passport = require('passport'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

module.exports.register = (req, res) => {
	//this method in production environment should have a lot of things to think about such as validation and error handling
	var user = new User();
	user.name = req.body.name;
	user.email = req.body.email;
	user.setPassword(req.body.password);
	user.save(function (err) {
		var token;
		token = user.generateJwt();
		res.status(200);
		res.json({
			"token": token
		});
	});
};

module.exports.login = (req, res) => {
	passport.authenticate('local', function (err, user, info) {
		var token;
		if (err) {
			res.status(400);
			json(err);
			return;
		}
		if (user) {
			token = user.generateJwt();
			res.status(200);
			res.json({
				"token": token
			});
		} else {
			res.status(401).json(info);
		}
	})(req, res);
};