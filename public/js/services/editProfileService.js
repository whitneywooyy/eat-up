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
	
});	// End app.service