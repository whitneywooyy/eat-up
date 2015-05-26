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

	var currentUsername = undefined;

	this.suggestedUsers = function(){
		var dfd = $q.defer();
		$http({
			method: "GET",
			url: '/api/suggested-users'
		}).then(function(response){
			console.log("suggested users", response.data);
			var parsedResponse = response.data;
			if (!parsedResponse) {
				dfd.resolve(false);
			} else {
				var suggUsersArr = [];
				var parsedUserData = {};
				$http({
					method: "GET",
					url: '/api/dashboard'
				}).then(function(response){
					for (var key in parsedResponse) {
						parsedUserData = {
							facebookProfilePic: parsedResponse[key].facebookProfilePic,
							firstName: parsedResponse[key].firstName,
							lastName: parsedResponse[key].lastName,
							gender: parsedResponse[key].gender,
							location: parsedResponse[key].location,
							username: parsedResponse[key].username,
							bio: parsedResponse[key].bio,
							foods: parsedResponse[key].foods
						};	
						currentUsername = response.data.username;
						console.log('currentUsername1', currentUsername);
						if (parsedResponse[key].username !== currentUsername) {	// How to 
							suggUsersArr.push(parsedUserData);
							console.log(suggUsersArr);
						}
					};
				});
				// console.log('parsedResponse[key].username', parsedResponse[key].username);
				// 	console.log('currentUsername2', currentUsername);
					
				return dfd.resolve(suggUsersArr); 
			}
		});
		return dfd.promise;
	};	// End .suggestedUsers
	
});	// End app.controller