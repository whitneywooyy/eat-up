var app = angular.module('eatUp');

app.service('userProfileService', function($http, $q){
	this.getUserData = function(userObj){
		var dfd = $q.defer();
		console.log("userObj", userObj);
		$http({
			method: "GET",
			url: '/api/public-profile/:username',
			data: userObj
		}).then(function(response){
			console.log('response434', response);
			if (!response.data) {
				dfd.resolve(false);
			}
			else {
				return dfd.resolve(response.data);
			}
		});	// End .then
		return dfd.promise;
	};	// End .getUserData
	
});	// End app.controller