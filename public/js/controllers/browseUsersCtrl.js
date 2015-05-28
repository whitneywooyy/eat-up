var app = angular.module('eatUp');

app.controller('browseUsersCtrl', function($scope, browseUsersService){
	browseUsersService.getUserData().then(function(result){
		console.log('result for browsing users', result);
		$scope.showUserData = result;
	})
});	// End app.controller