var mongoose = require('mongoose');
// var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
	facebookId: { type: String, unique: true },
	firstName: { type: String },
	lastName: { type: String },
	gender: { type: String },
	location: { type: String },
	email: { type: String, unique: true, sparse: true },
	username: { type: String, unique: true, sparse: true },
	password: { type: String },
	city: { type: String },
	state: { type: String },
	zipCode: { type: String },
	member: { type: Boolean, default: false },
	bio: { type: String },
	facebookProfilePic: { type: String },
	birthday: { type: String },
	updated: { type: Date, default: Date.now },
	foods: [{
			cuisines: {
				enum: [
					'Korean',
					'Italian',
					'Nepalese',
					'Indian',
					'Thai',
					'Chinese',
					'American',
					'New American',
					'Japanese',
					'Ethiopian',
					'Cuban',
					'Mexican',
					'Venezuelan',
					'Columbian',
					'Taiwanese',
					'Szechuan',
					'Cantonese',
					'Pakistani',
					'French',
					'Irish',
					'British',
					'German',
					'Moroccan',
					'Lebanese',
					'Russian',
					'Puerto Rican',
					'Indonesian',
					'Philippine',
					'Singaporean',
					'Vietnamese',
					'Laotian',
					'Brazilian',
					'Polish',
					'Turkish',
					'Belgian',
					'Baltic',
					'Balkan',
					'Scandinavian',
					'Greek',
					'Spanish',
					'Chilean',
					'Peruvian',
					'Sudanese',
					'Mongolian',
					'Malaysian',
					'Persian',
					'Australian',
					'Bushfoods',
					'Mediterranean',
					'Pacific Islandic',
					'Native American',
					'Canadian',
					'Vegan',
					'Vegetarian',
					'American Barbeque',
					'Cajun',
					'Soul Food',
					'Health-conscious',
					'Seafood'
				]
			},
			interestLevel: {
				enum: [
					'Love it',
					'Like it',
					'Dislike it',
					'Never tried it but want to!',
					'Never want to try it'
				]
			},
			faveFoodTypes: {
				enum: [
					'Soups',
					'Sandwiches',
					'Pizzas',
					'Pastas',
					'Roasts',
					'Curries',
					'Stir-frys',
					'Baked',
					'Salads',
					'Grilled',
					'Barbeque',
					'Casseroles',
					'Noodles',
					'Porridges',
					'Rices',
					'Deep-fried',
					'Sausages',
					'Cheeses',
					'Meats',
					'Fish',
					'Desserts'
				]
			},
			faveFlavors: {
				enum: [
					'Plain/basic',
					'Spicy',
					'Salty',
					'Sweet',
					'Natural',
					'Grilled',
					'Garlicky',
					'Peppery',
					'Sour',
					'Tangy/Citrusy',
					'Gamey',
					'Buttery',
					'Vegetable-y',
					'Fruity'
				]
			},
			foodieLevel: {
				enum: [
					'Adventurous - You are super epicurious and are in constant pursuit of indulging in great, authentic, or unique foods from all over the world. You thrive on flavor. And, you\'ll try literally ANYTHING at least once!',
					'Open-minded - You believe in mixing it up and trying new kinds of foods whenever possible. The only foods you won\'t touch are those containing insects, live animals, or anything else you have been conditioned to be appalled by.',
					'Favorite-player - It\'s not that you\'re unwilling to try new things, it\'s that you already have your favorites - the \'tried and true\' dishes that never disappoint - and those are what you like to stick with. You also prefer flavors that don\'t stray too far from what you\'re used to.'
				]
			}
		}]
});	// End userSchema

// PASSWORD HASHING

// userSchema.pre('save', function(next){
// 	var user = this;
// 	if (!user.isModified('password')) {
// 		return next()
// 	}
// 	bcrypt.genSalt(12, function(err, salt){
// 		if (err) {
// 			return next(err)
// 		}
// 		bcrypt.hash(user.password, salt, null, function(err, hash){
// 			if (err) {
// 				return next(err)
// 			}
// 			user.password = hash;
// 			next();
// 		});
// 	});
// });

// userSchema.methods.comparePw = function(password, cb){
// 	bcrypt.compare(password, this.password, function(err, res){
// 		if(err) return cb(err, null);
// 		else cb(null, res);
// 	})
// }

module.exports = mongoose.model('User', userSchema);