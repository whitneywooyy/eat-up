var app = angular.module('eatUp');

app.service('userDashboardService', function($http, $q){
	this.getUserData = function(userObj){
		var dfd = $q.defer();
		// console.log("userObj", userObj);
		$http({
			method: "GET",
			url: '/api/dashboard',
			data: userObj
		}).then(function(response){
			console.log('response434', response);
			if (!response.data) {
				dfd.resolve(false);
			}
			// var parsedRes = response.data.user;
			// console.log('parsedRes', parsedRes);
			// var newObj = {
			// 	facebookId: parsedRes.id,
			// 	firstName: parsedRes.first_name,
			// 	lastName: parsedRes.last_name,
			// 	gender: parsedRes.gender,
			// 	location: parsedRes.location,
			// 	email: parsedRes.email,
			// 	username: parsedRes.username,
			// 	city: parsedRes.city,
			// 	state: parsedRes.state,
			// 	zipCode: parsedRes.zipcode,
			// 	facebookProfilePic: parsedRes.picture.data.url,
			// 	age: parsedRes.age_range
			// }
			// console.log("Service_newObj", newObj);
			// dfd.resolve(newObj);
			else {
				return dfd.resolve(response.data);
			}
		});	// End .then
		return dfd.promise;
	};	// End .getUserData
	
});	// End app.controller