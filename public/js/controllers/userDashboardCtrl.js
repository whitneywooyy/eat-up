var app = angular.module('eatUp');

app.controller('userDashboardCtrl', function($scope, userDashboardService){
	userDashboardService.getUserData().then(function(result){
		console.log('Ctrl_result', result);
		$scope.showUserData = result;
			});

});	// End app.controller