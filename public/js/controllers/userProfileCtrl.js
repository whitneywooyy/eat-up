var app = angular.module('eatUp');

app.controller('userProfileCtrl', function($scope, userProfileService, userRef){	//, userRef
	$scope.userData = userRef;
	
});	// End app.controller