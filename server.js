

// DEPENDENCIES
	var express = require('express');
	var mongoose = require('mongoose');
	var passport = require('passport');
	// var flash = require('connect-flash');
	// var morgan = require('morgan');
	var cookie = require('cookie-parser');
	var bodyParser = require('body-parser');
	var session = require('express-session');
	var cors = require('cors');

	var local = require('passport-local');
	var override = require('method-override');
	var FacebookStrategy = require('passport-facebook').Strategy;
	// var TwitterStrategy = require('passport-twitter').Strategy;
	// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// CONTROLLERS
	var UserCtrl = require('./lib/controllers/UserCtrl');

// MODELS
	var User = require('./lib/models/User');
	var Foods = require('./lib/models/Foods');

// EXPRESS
	var app = express();

// SERVER VARIABLES
	var port = 8888;
	var mongoUri = 'mongodb://localhost:27017/eatup';

// CONNECTIONS
	mongoose.connect(mongoUri);
	mongoose.connection.once('open', function() {
	  console.log('Connected to MongoDB at ', mongoUri);
	});

// MIDDLEWARE
	// app.use(morgan('dev'));
	app.use(cookie());
	app.use(bodyParser.json());

	app.use(session({ secret: 'kjhafd9032k23g' }));
	app.use(passport.initialize());
	app.use(passport.session());

	// app.use(flash());
	app.use(express.static(__dirname + '/public'));
	app.use(cors());

	// requireAuth handles multiple login entrypoints
	var requireAuth = function(req, res, next) {
	  // console.log("req", req);	// req.user is undefined but req returns a huge object of data - Twitter, Facebook
	  if (req.isAuthenticated()) {
	  	// console.log("You're authed", req.user);
	    return next();
	  } else {
		  console.log('Im redirecting now...');
		  return res.redirect('/#/login');
		}	
	};

// PASSPORT
	// .serializeUser and .deserializeUser shared between Twitter, Facebook, AND Google
	passport.serializeUser(function(user, done) {
	  done(null, user);
	});
	passport.deserializeUser(function(obj, done) {
	  done(null, obj);
	});
	passport.use(new FacebookStrategy({
		// Eat Up App - Facebook Developers
	    clientID: FACEBOOK_APP_ID,
	    clientSecret: FACEBOOK_APP_SECRET,
	    callbackURL: "http://localhost:" + port + "/auth/facebook/callback",
	    profileFields: ['id', 'age_range', 'email', 'gender', 'first_name', 'last_name', 'location', 'picture']
	  }, function(accessToken, refreshToken, profile, done) {
		// console.log("profile", profile);
			User.findOne({
				'facebook.id': profile.id 
		    }, function(err, user) {
		        if (err) {
		            return done(err);
		        }
		        if (!user) {
		            user = new User({
		            	facebookId: profile.id,
		                firstName: profile.name.givenName,
		                lastName: profile.name.familyName,
		                gender: profile.gender,
		                location: profile.location,
		                facebookProfilePic: profile.photos[0].value,
		                email: profile.email,
		                // provider: 'facebook',
		                //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
		                facebook: profile._json
		            });
		            user.save(function(err, user) {
		                if (err) console.log(err);
		                return done(err);
		            });
		        } else {
		            return done(null, user);
		        }
			})
		return done(null, profile);
	}));

// ENDPOINTS
	app.get('/api/pub/:username', function(req, res){
		var username = req.params.username;
		// console.log('username', username);
		User.findOne({ username: username }, function(err, user){
			if (err) {
				res.send("There was an error");
			} else {
				console.log("TEST");
				res.json(user);
				// res.redirect('/user/:username');
			}
		});
	});	// End .get
	app.get('/api/dashboard', requireAuth, function(req, res) {
		// console.log("Current user ", req.user.id)
		// console.log('req on req', req.user);
		User.findOne({facebookId: req.user.id}, function(err, user){
			if (err) {
				res.send("There was an error");
			} else {
				res.json(user);
			}
		})
	});
	app.get('/api/public-profile', function(req, res) {
		// console.log("Current user ", req.user.id)
		// console.log('req on req', req.user);
		User.findOne({facebookId: req.user.id}, function(err, user){
			if (err) {
				res.send("There was an error");
			} else {
				res.json(user);
			}
		})
	});

	// EDIT USER PROFILE ENDPOINTS
	app.put('/api/user/name', function(req, res){
		console.log('req.body', req.body);
		console.log('req.user!!!', req.user);
		User.findOneAndUpdate({ facebookId: req.user.id }, { firstName: req.body.firstName, lastName: req.body.lastName }, { new: true }, function(err, user) {
			if (err) {
				console.log("can't update name", err);
			}
			console.log('user', user);
			return res.json(user);
		});
	});
	app.put('/api/user/email', function(req, res){
		console.log('req.body', req.body);
		console.log('req.user-email!', req.user);
		User.findOneAndUpdate({ facebookId: req.user.id }, { email: req.body.email }, { new: true }, function(err, user) {
			if (err) {
				console.log("can't update email", err);
			}
			console.log('user', user);
			return res.json(user);
		});
	});
	app.put('/api/user/username', function(req, res){
		console.log('req.body', req.body);
		console.log('req.user-username!', req.user);
		User.findOneAndUpdate({ facebookId: req.user.id }, { username: req.body.username }, { new: true }, function(err, user) {
			if (err) {
				console.log("can't update username", err);
			}
			console.log('user', user);
			return res.json(user);
		});
	});
	app.put('/api/user/password', function(req, res){
		console.log('req.body', req.body);
		console.log('req.user-password!', req.user);
		User.findOneAndUpdate({ facebookId: req.user.id }, { password: req.body.password }, { new: true }, function(err, user) {
			if (err) {
				console.log("can't update password", err);
			}
			console.log('user', user);
			return res.json(user);
		});
	});
	app.put('/api/user/location', function(req, res){
		console.log('req.body', req.body);
		console.log('req.user-location!', req.user);
		User.findOneAndUpdate({ facebookId: req.user.id }, { location: req.body.location }, { new: true }, function(err, user) {
			if (err) {
				console.log("can't update location", err);
			}
			console.log('user', user);
			return res.json(user);
		});
	});
	app.put('/api/user/gender', function(req, res){
		console.log('req.body', req.body);
		console.log('req.user-gender!', req.user);
		User.findOneAndUpdate({ facebookId: req.user.id }, { gender: req.body.gender }, { new: true }, function(err, user) {
			if (err) {
				console.log("can't update gender", err);
			}
			console.log('user', user);
			return res.json(user);
		});
	});
	app.put('/api/user/birthday', function(req, res){
		console.log('req.body', req.body);
		console.log('req.user-birthday!', req.user);
		User.findOneAndUpdate({ facebookId: req.user.id }, { birthday: req.body.birthday }, { new: true }, function(err, user) {
			if (err) {
				console.log("can't update birthday", err);
			}
			console.log('user', user);
			return res.json(user);
		});
	});
	app.put('/api/user/bio', function(req, res){
		console.log('req.body', req.body);
		console.log('req.user-bio!', req.user);
		User.findOneAndUpdate({ facebookId: req.user.id }, { bio: req.body.bio }, { new: true }, function(err, user) {
			if (err) {
				console.log("can't update bio", err);
			}
			console.log('user', user);
			return res.json(user);
		});
	});
	app.put('/api/user/foods', function(req, res){
		console.log('req.body', req.body);
		console.log('req.user-bio!', req.user);
		User.findOneAndUpdate({ facebookId: req.user.id }, { foods: req.body.foods }, { new: true }, function(err, user) {
			if (err) {
				console.log("can't update bio", err);
			}
			console.log('user', user);
			return res.json(user);
		});
	});

	// SOCIAL OAUTH
	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		failureRedirect: '/#/login' 
	}), function(req, res) {
		console.log("req.userData", req.user);
		res.redirect('/#/dashboard');
	});

	// LOGOUT
	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	  console.log("You've logged out");
	});

// LISTENING
	app.listen(port, function() {
	  console.log('Listening on port ', port);
	});