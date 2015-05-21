var app = angular.module('eatUp');

app.controller('userProfileCtrl', function($scope, userProfileService){

	userProfileService.getUserData().then(function(result){
		console.log('Ctrl_result', result);
		$scope.showUserData = result;
	});
	
});	// End app.controller