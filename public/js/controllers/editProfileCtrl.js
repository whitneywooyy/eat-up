var app = angular.module('eatUp');

app.controller('editProfileCtrl', function($scope, userDashboardService, editProfileService, $http, $location){
	
	userDashboardService.getUserData().then(function(result){
		console.log('Ctrl_result', result);
		$scope.showUserData = result;
	});

	$scope.updateName = function(first, last){
		editProfileService.updateName(first, last)
		.then(function(result){
			console.log('Ctrl_result2', result);
			userDashboardService.getUserData().then(function(result){
				console.log('Ctrl_result', result);
				$scope.showUserData = result;
			});
			$location.path('/edit-profile');
		});
	};	// End .updateName

	$scope.updateEmail = function(email){
		editProfileService.updateEmail(email)
		.then(function(result){
			console.log('Ctrl_result2', result);
			userDashboardService.getUserData().then(function(result){
				console.log('Ctrl_result', result);
				$scope.showUserData = result;
			});
			$location.path('/edit-profile');
		});
	};	// End .updateEmail

	$scope.updateUsername = function(username){
		editProfileService.updateUsername(username)
		.then(function(result){
			console.log('Ctrl_result2', result);
			userDashboardService.getUserData().then(function(result){
				console.log('Ctrl_result', result);
				$scope.showUserData = result;
			});
			$location.path('/edit-profile');
		});
	};	// End .updateUsername

	$scope.updatePassword = function(password){
		editProfileService.updatePassword(password)
		.then(function(result){
			console.log('Ctrl_result2', result);
			userDashboardService.getUserData().then(function(result){
				console.log('Ctrl_result', result);
				$scope.showUserData = result;
			});
			$location.path('/edit-profile');
		});
	};	// End .updatePassword

	$scope.updateLocation = function(location){
		editProfileService.updateLocation(location)
		.then(function(result){
			console.log('Ctrl_result2', result);
			userDashboardService.getUserData().then(function(result){
				console.log('Ctrl_result', result);
				$scope.showUserData = result;
			});
			$location.path('/edit-profile');
		});
	};	// End .updateLocation

	$scope.updateGender = function(gender){
		editProfileService.updateGender(gender)
		.then(function(result){
			console.log('Ctrl_result2', result);
			userDashboardService.getUserData().then(function(result){
				console.log('Ctrl_result', result);
				$scope.showUserData = result;
			});
			$location.path('/edit-profile');
		});
	};	// End .updateGender

	$scope.updateBirthday = function(birthday){
		editProfileService.updateBirthday(birthday)
		.then(function(result){
			console.log('Ctrl_result2', result);
			userDashboardService.getUserData().then(function(result){
				console.log('Ctrl_result', result);
				$scope.showUserData = result;
			});
			$location.path('/edit-profile');
		});
	};	// End .updateBirthday

	$scope.updateBio = function(bio){
		editProfileService.updateBio(bio)
		.then(function(result){
			console.log('Ctrl_result2', result);
			userDashboardService.getUserData().then(function(result){
				console.log('Ctrl_result', result);
				$scope.showUserData = result;
			});
			$location.path('/edit-profile');
		});
	};	// End .updateBio

	$scope.updateFoods = function(foodsObj){
		console.log('foodsObj in CTRL', foodsObj);
		editProfileService.updateFoods(foodsObj)
		.then(function(result){
			console.log('Ctrl_result2', result);
			userDashboardService.getUserData().then(function(result){
				console.log('Ctrl_result', result);
				$scope.showUserData = result;
			});
			$location.path('/edit-profile');
		});
	};	// End .updateFoods

});	// End app.controller