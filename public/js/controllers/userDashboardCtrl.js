var app = angular.module('eatUp');

app.controller('userDashboardCtrl', function($scope, userDashboardService, $state){

	userDashboardService.getUserData().then(function(result){
		// console.log('Ctrl_result', result);
		$scope.showUserData = result;
	});

	userDashboardService.suggestedUsers().then(function(result){
		// console.log('SU Ctrl_result', result);
		$scope.suggestedUsers = result;
	});

});	// End app.controller