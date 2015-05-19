var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
	facebookId: { type: String },
	firstName: { type: String },
	lastName: { type: String },
	gender: { type: String },
	location: { type: String },
	email: { type: String, unique: true, sparse: true },
	username: { type: String, unique: true, sparse: true  },
	password: { type: String },
	city: { type: String },
	state: { type: String },
	zipCode: { type: Number },
	member: { type: Boolean, default: false },
	facebookProfilePic: { type: String },
	ageRange: { type: String },
	updated: { type: Date, default: Date.now }
});	// End userSchema

userSchema.pre('save', function(next){
	var user = this;
	if (!user.isModified('password')) {
		return next()
	}
	bcrypt.genSalt(12, function(err, salt){
		if (err) {
			return next(err)
		}
		bcrypt.hash(user.password, salt, null, function(err, hash){
			if (err) {
				return next(err)
			}
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePw = function(password, cb){
	bcrypt.compare(password, this.password, function(err, res){
		if(err) return cb(err, null);
		else cb(null, res);
	})
}

module.exports = mongoose.model('User', userSchema);