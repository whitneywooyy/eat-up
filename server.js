// DEPENDENCIES
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// CONTROLLERS

// EXPRESS
var app = express();

// SERVER VARIABLES
var port = 8888;


// MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: 'kjhafd9032k23g' }));
app.use(passport.initialize());
app.use(passport.session());

// requireAuth handles multiple login entrypoints
var requireAuth = function(req, res, next) {
  console.log("is authed?", req.user);
  if (req.isAuthenticated()) {
  	console.log("You're authed");
    return next();
  } else {
	  console.log('Im redirecting now...');
	  return res.redirect('/#/login');
	}	
}
app.get('/test', requireAuth, function(req, res) {
  return res.sendFile(__dirname + '/public/home');
})

// PASSPORT
// .serializeUser and .deserializeUser shared between Twitter, Facebook, AND Google
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
passport.use(new TwitterStrategy({
	// Eat Up App - dev.twitter.com/apps
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: 'http://localhost:' + port + '/auth/twitter/callback'
}, function(token, tokenSecret, profile, done) {
  // console.log('some kind of test', token);
  process.nextTick(function(){
  	return done(null, profile);
  })
}));
passport.use(new FacebookStrategy({
	// Eat Up App - Facebook Developers
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:" + port + "/auth/facebook/callback"
  }, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));
passport.use(new GoogleStrategy({
	// Eat Up App - Google Developers Console
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:" + port + "/auth/google/callback"
  }, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

// ENDPOINTS
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/#/username/dashboard',
  failureRedirect: '/#/login'
}), function(req, res) {
	console.log(req.session);
});
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { 
	successRedirect: '/#/username/dashboard',
	failureRedirect: '/#/login' 
}), function(req, res) {
	console.log(req.session);
});
app.get('/auth/google', passport.authenticate('google', { 
	scope: ['https://www.googleapis.com/auth/plus.login'] 
}));
app.get('/auth/google/callback', passport.authenticate('google', {
	successRedirect: '/#/username/dashboard', 
	failureRedirect: '/#/login' 
}), function(req, res) {
	console.log("Response", req.session);
});

// logout
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
  console.log("You've logged out");
});

// CONNECTIONS
var mongoUri = 'mongodb://localhost:27017/eatup';

mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
  console.log('Connected to MongoDB at ', mongoUri);
});

// LISTENING
app.listen(port, function() {
  console.log('Listening on port ', port);
});