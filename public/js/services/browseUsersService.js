var app = angular.module('eatUp');

app.service('browseUsersService', function($http, $q){

	this.getUserData = function(){
		var dfd = $q.defer();
		// console.log("userObj", userObj);
		$http({
			method: "GET",
			url: '/api/suggested-users',
		}).then(function(response){
			// console.log('response434', response);
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