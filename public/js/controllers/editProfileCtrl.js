var app = angular.module('eatUp');

app.controller('editProfileCtrl', function($scope, userDashboardService, $state, $http){
	userDashboardService.getUserData().then(function(result){
		console.log('Ctrl_result', result);
		$scope.showUserData = result;
	});

	$scope.update = function(firstName, lastName){
		console.log($scope.firstName, $scope.lastName);
		$http({
			method: "put",
			url: '/api/user/name',
			data: {
				firstName: firstName,
				lastName: lastName
			}
		}).then(function(response){
			// refresh();
			console.log('response!!!@!', response.data);
			$scope.showUserData = response.data;	// View not updating with new user info
		})
	};	// End .update

});	// End app.controller