var app = angular.module('eatUp');

app.service('userProfileService', function($http, $q){
	this.userPublicData = function(username){
		var dfd = $q.defer();
		console.log("username", username);
		$http({
			method: "GET",
			url: '/api/pub/' + username
		})
		.then(function(response){
			console.log('response!!!!', response.data);
			if (!response.data) {
				dfd.resolve(false);
			}
			else {
				return dfd.resolve(response.data);
			}
		});	// End .then
		return dfd.promise;
	};	// End .userPublicData
	
});	// End app.controller