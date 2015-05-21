var app = angular.module('eatUp');

app.controller('userDashboardCtrl', function($scope, userDashboardService, $state){

	userDashboardService.getUserData().then(function(result){
		console.log('Ctrl_result', result);
		$scope.showUserData = result;
	});

});	// End app.controller