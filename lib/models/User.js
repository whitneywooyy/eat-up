var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	firstName: { type: String },
	lastName: { type: String },
	email: { type: String, unique: true },
	username: { type: String, unique: true },
	city: { type: String },
	state: { type: String },
	zipCode: { type: Number },
	member: { type: Boolean, default: false },
	facebookProfilePic: { type: String },
	updated: { type: Date, default: Date.now }
});	// End userSchema

module.exports = mongoose.model('User', userSchema);