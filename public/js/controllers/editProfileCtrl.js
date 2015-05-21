var app = angular.module('eatUp');

app.controller('editProfileCtrl', function($scope, userDashboardService, editProfileService, $http){
	$scope.getUserData = function(){
		userDashboardService.getUserData().then(function(result){
			console.log('Ctrl_result', result);
			$scope.showUserData = result;
		});
	};

	$scope.updateName = function(first, last){
		editProfileService.updateName(first, last)
		.then(function(result){
			console.log('Ctrl_result2', result);
			$scope.getUserData();
		});
	};	// End .updateName

});	// End app.controller