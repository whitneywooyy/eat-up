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
	var currentUserFaveFoods = undefined;

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
					currentUsername = response.data.username;
					currentUserFaveFoods = response.data.foods;
					var foodKeys = Object.keys(currentUserFaveFoods);
					currentUserFaveFoods = foodKeys.sort();
					// Add in function to capitalize the first letter of each food
					console.log(currentUsername + "'s favorite foods are", currentUserFaveFoods);
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
						if (parsedResponse[key].username !== currentUsername) {
							suggUsersArr.push(parsedUserData);
						}
					};
					console.log('suggUsersArr', suggUsersArr);
				});					
				return dfd.resolve(suggUsersArr); 
			}
		});
		return dfd.promise;
	};	// End .suggestedUsers
	
});	// End app.controller