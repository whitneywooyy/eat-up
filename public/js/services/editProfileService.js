var app = angular.module('eatUp');

app.service('editProfileService', function($http, $q){
	this.updateName = function(firstName, lastName){
		console.log(firstName, lastName);
		var dfd = $q.defer();
		$http({
			method: "put",
			url: '/api/user/name',
			data: {
				firstName: firstName,
				lastName: lastName
			}
		}).then(function(response){
			// refresh();
			console.log('response!!!@!', response);
			return dfd.resolve(response.data);
		})
		return dfd.promise;
	};	// End .updateName

	this.updateEmail = function(email){
		console.log(email);
		var dfd = $q.defer();
		$http({
			method: "put",
			url: '/api/user/email',
			data: {
				email: email
			}
		}).then(function(response){
			console.log('response!!!@!', response);
			return dfd.resolve(response.data);
		})
		return dfd.promise;
	};	// End .updateEmail

	this.updateUsername = function(username){
		console.log(username);
		var dfd = $q.defer();
		$http({
			method: "put",
			url: '/api/user/username',
			data: {
				username: username
			}
		}).then(function(response){
			console.log('response!!!@!', response);
			return dfd.resolve(response.data);
		})
		return dfd.promise;
	};	// End .updateUsername

	this.updatePassword = function(password, passwordConf){
		// console.log(password);
		var matchingPws = undefined;
		if (password === passwordConf) {
			matchingPws = password;
			var dfd = $q.defer();
			$http({
				method: "put",
				url: '/api/user/password',
				data: {
					password: matchingPws
				}
			}).then(function(response){
				console.log('response!!!@!', response);
				return dfd.resolve(response.data);
			})
			return dfd.promise;
		} else {
			console.log ("Passwords do not match!");
		}
	};	// End .updatePassword

	this.updateLocation = function(location){
		console.log(location);
		var dfd = $q.defer();
		$http({
			method: "put",
			url: '/api/user/location',
			data: {
				location: location
			}
		}).then(function(response){
			console.log('response!!!@!', response);
			return dfd.resolve(response.data);
		})
		return dfd.promise;
	};	// End .updateLocation

	this.updateGender = function(gender){
		console.log(gender);
		var dfd = $q.defer();
		$http({
			method: "put",
			url: '/api/user/gender',
			data: {
				gender: gender
			}
		}).then(function(response){
			console.log('response!!!@!', response);
			return dfd.resolve(response.data);
		})
		return dfd.promise;
	};	// End .updateGender

	this.updateBirthday = function(birthday){
		console.log(birthday);
		var dfd = $q.defer();
		$http({
			method: "put",
			url: '/api/user/birthday',
			data: {
				birthday: birthday
			}
		}).then(function(response){
			console.log('response!!!@!', response);
			return dfd.resolve(response.data);
		})
		return dfd.promise;
	};	// End .updateBirthday

	this.updateBio = function(bio){
		console.log(bio);
		var dfd = $q.defer();
		$http({
			method: "put",
			url: '/api/user/bio',
			data: {
				bio: bio
			}
		}).then(function(response){
			console.log('response!!!@!', response);
			return dfd.resolve(response.data);
		})
		return dfd.promise;
	};	// End .updateBio

	this.updateFoods = function(foodsObj){
		console.log('foodsObj in SERVICE', foodsObj);
		var dfd = $q.defer();
		$http({
			method: "put",
			url: '/api/user/foods',
			data: {
				foods: foodsObj
			}
		}).then(function(response){
			console.log('foods service response', response);
			return dfd.resolve(response.data);
		})
		return dfd.promise;
	};	// End .updateFoods

	this.updateLevel = function(level){
		console.log('level in SERVICE', level);
		var dfd = $q.defer();
		$http({
			method: "put",
			url: '/api/user/levels',
			data: {
				level: level
			}
		}).then(function(response){
			console.log('level service response', response);
			return dfd.resolve(response.data);
		})
		return dfd.promise;
	};	// End .updateLevel

	this.updatePicture = function(imageUrl){
		console.log('imageUrl in SERVICE', imageUrl);
		var dfd = $q.defer();
		$http({
			method: "put",
			url: '/api/user/picture',
			data: {
				imageUrl: imageUrl
			}
		}).then(function(response){
			console.log('imageUrl service response', response);
			return dfd.resolve(response.data);
		})
		return dfd.promise;
	};	// End .updatePicture
	
});	// End app.service