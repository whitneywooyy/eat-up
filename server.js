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
// var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// CONTROLLERS
var UserCtrl = require('./lib/controllers/UserCtrl');

// MODELS
var User = require('./lib/models/User');

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

// *** Remove keys and secrets before pushing to Github ***
// var TWITTER_CONSUMER_KEY = "jhImqkwsWZzwTQPcp8ZWuriTV";
// var TWITTER_CONSUMER_SECRET = "IiBEorFNAA4J0g5Vyr3VvMvfpLaHt7DtRVIL0Szu6M0CW4FHip";
var FACEBOOK_APP_ID = "964186640278623";
var FACEBOOK_APP_SECRET = "2805712524f0d1e61bbec792c4b41766";
var GOOGLE_CLIENT_ID = "274755072333-k81t8bmpdjesmch2frogfn14j6f982k0.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET = "aBV8a1c8VJM2RVcg8O-m7zl3";

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

// require('./lib/passport.js')(passport);

// requireAuth handles multiple login entrypoints
var requireAuth = function(req, res, next) {
  // console.log("req", req);	// req.user is undefined but req returns a huge object of data - Twitter, Facebook
  if (req.isAuthenticated()) {
  	console.log("You're authed", req.user);
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
// passport.use(new TwitterStrategy({
// 	// Eat Up App - dev.twitter.com/apps
//   consumerKey: TWITTER_CONSUMER_KEY,
//   consumerSecret: TWITTER_CONSUMER_SECRET,
//   callbackURL: 'http://localhost:' + port + '/auth/twitter/callback'
// }, function(token, tokenSecret, profile, done) {
//   // console.log('some kind of test', token);
//   process.nextTick(function(){
//   	return done(null, profile);
//   })
// }));

passport.use(new FacebookStrategy({
	// Eat Up App - Facebook Developers
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:" + port + "/auth/facebook/callback",
    profileFields: ['id', 'age_range', 'email', 'gender', 'first_name', 'last_name', 'location', 'picture']
  }, function(accessToken, refreshToken, profile, done) {
    // process.nextTick(function () {
    // 	console.log("profile", profile);
    //   return done(null, profile);
    // });
	console.log("profile", profile);
		User.findOne({
			'facebook.id': profile.id 
	    }, function(err, user) {
	        if (err) {
	            return done(err);
	        }
	        //No user was found... so create a new user with values from Facebook (all the profile. stuff)
	        if (!user) {
	            user = new User({
	            	facebookId: profile.id,
	                firstName: profile.name.givenName,
	                lastName: profile.name.familyName,
	                gender: profile.gender,
	                location: profile.location,
	                facebookProfilePic: profile.photos[0].value,
	                ageRange: profile._json.age_range,
	                email: profile.email,
	                // provider: 'facebook',
	                //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
	                facebook: profile._json
	            });
	            user.save(function(err) {
	                if (err) console.log(err);
	                return done(err, user);
	            });
	        } else {
	            //found user. Return
	            return done(err, user);
	        }
		})
		return done(null, profile);
}));
// passport.use(new GoogleStrategy({
// 	// Eat Up App - Google Developers Console
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:" + port + "/auth/google/callback"
//   }, function(accessToken, refreshToken, profile, done) {
//     process.nextTick(function () {
//       return done(null, profile);
//     });
//   }
// ));

// ENDPOINTS
	// app.get('/api/test', requireAuth, function(req, res) {
	// 	console.log('req on req', req.user);
	//   return res.send({
	//   	user: req.user
	//   });
	//   // sendFile(__dirname + '/public');
	// });

	// In Dashboard Angular Service, call $http /api/dashboard to retrieve this data
	app.get('/api/dashboard', requireAuth, function(req, res) {
		console.log('req on req', req.user);
	  return res.send({
	  	user: req.user
	  });
	});
	// app.get('/', function(req, res){
	// 	res.render('home');
	// });
	// app.get('/login', function(req, res){
	// 	res.render('login');
	// });
	app.post('/api/user', UserCtrl.create);
	app.put('/api/user')

	// SOCIAL OAUTH
	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		failureRedirect: '/#/login' 
	}), function(req, res) {
		console.log("req.userData", req.user);
		res.redirect('/#/username/dashboard');
	});
	// app.get('/auth/twitter', passport.authenticate('twitter'));
	// app.get('/auth/twitter/callback', passport.authenticate('twitter', {
	//   successRedirect: '/#/username/dashboard',
	//   failureRedirect: '/#/login'
	// }), function(req, res) {
	// 	console.log(req.session);
	// });
	// app.get('/auth/google', passport.authenticate('google', { 
	// 	scope: ['https://www.googleapis.com/auth/plus.login'] 
	// }));
	// app.get('/auth/google/callback', passport.authenticate('google', {
	// 	successRedirect: '/#/username/dashboard', 
	// 	failureRedirect: '/#/login' 
	// }), function(req, res) {
	// 	console.log("Response", req.session);
	// });

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