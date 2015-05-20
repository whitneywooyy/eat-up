var app = angular.module('eatUp');

app.controller('loginCtrl', function($scope, Auth) { 
	$scope.auth = Auth;
});	// End app.controller

		// here, we fake authenticating and give a fake user
	// 	principal.authenticate({
	// 	  name: 'Test User',
	// 	  roles: ['User']
	// 	});

	// 	if ($scope.returnToState) {
	// 		$state.go($scope.returnToState.name, $scope.returnToStateParams);
	// 	} else {
	// 		$state.go('home');
	// 	}
	// };
// });	

// app.run(function($rootScope, $state, $stateParams, authorization, principal) {
// 	$rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
// 		$rootScope.toState = toState;
// 		$rootScope.toStateParams = toStateParams;

// 		if (principal.isIdentityResolved()) {
// 			authorization.authorize();
// 		}
// 	});
// });

// app.run(function ($rootScope, $state, $location, Auth) {
//     $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
// 		// NOT authenticated - wants any private stuff
//     	var shouldLogin = toState.data !== undefined && toState.data.requireLogin && !Auth.isLoggedIn;
// 		if (shouldLogin) {
// 			$state.go('login');
// 			event.preventDefault();
// 			return;
// 		} else if (!shouldLogin) {
// 			return;
// 		}
      
// 		// authenticated (previously) coming not to root main
// 		// if (Auth.isLoggedIn) {
// 		// var shouldGoToDash = fromState.name === "";
// 		// // && toState.name !== "dashboard";
// 		// 	if (shouldGoToDash) {
// 		// 	    $state.go('dashboard');
// 		// 	    event.preventDefault();
// 		// 	} 
// 		// 	return;
// 		// }	

// 		// UNauthenticated (previously) comming not to root public 
// 		// var shouldGoToPublic = fromState.name === "" && toState.name !== "home" && toState.name !== "login";
// 		// if (shouldGoToPublic) {
// 		// 	$state.go('home');console.log('home')
// 		// 	event.preventDefault();
// 		// } 
// 		// unmanaged
// 	});
// });	// End app.run