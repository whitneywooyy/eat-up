var app = angular.module('eatUp');

app.controller('editProfileCtrl', function($scope, userDashboardService, editProfileService, $http, $location){
	
	userDashboardService.getUserData().then(function(result){
		console.log('Ctrl_result', result);
		$scope.showUserData = result;
	});

	$scope.cancel = function(){
		$location.path('/edit-profile');
	};	// End .cancel

	$scope.updateName = function(first, last){
		editProfileService.updateName(first, last)
		.then(function(result){
			// console.log('Ctrl_result2', result);
			userDashboardService.getUserData().then(function(result){
				console.log('NAME Ctrl_result', result);
				$scope.showUserData = result;
			});
			$location.path('/edit-profile');
		});
	};	// End .updateName

	$scope.updateEmail = function(email){
		editProfileService.updateEmail(email)
		.then(function(result){
			// console.log('Ctrl_result2', result);
			userDashboardService.getUserData().then(function(result){
				console.log('EMAIL Ctrl_result', result);
				$scope.showUserData = result;
			});
			$location.path('/edit-profile');
		});
	};	// End .updateEmail

	$scope.updateUsername = function(username){
		editProfileService.updateUsername(username)
		.then(function(result){
			// console.log('Ctrl_result2', result);
			userDashboardService.getUserData().then(function(result){
				console.log('USERNAME Ctrl_result', result);
				$scope.showUserData = result;
			});
			$location.path('/edit-profile');
		});
	};	// End .updateUsername

	$scope.updatePassword = function(password, passwordConf){
		editProfileService.updatePassword(password, passwordConf)
		.then(function(result){
			// console.log('Ctrl_result2', result);
			userDashboardService.getUserData().then(function(result){
				console.log('PW Ctrl_result', result);
				$scope.showUserData = result;
				var pw = result.password;
				$scope.pw = pw;
				console.log('password', $scope.pw);
				var hiddenPw = pw.replace(/[^~,]/g, "*");
				$scope.hiddenPw = hiddenPw;
				console.log('$scope.hiddenPw', $scope.hiddenPw);
			});
			$location.path('/edit-profile');
		});
	};	// End .updatePassword

	$scope.updateLocation = function(location){
		editProfileService.updateLocation(location)
		.then(function(result){
			// console.log('Ctrl_result2', result);
			userDashboardService.getUserData().then(function(result){
				console.log('LOCATION Ctrl_result', result);
				$scope.showUserData = result;
			});
			$location.path('/edit-profile');
		});
	};	// End .updateLocation

	$scope.updateGender = function(gender){
		editProfileService.updateGender(gender)
		.then(function(result){
			// console.log('Ctrl_result2', result);
			userDashboardService.getUserData().then(function(result){
				console.log('GENDER Ctrl_result', result);
				$scope.showUserData = result;
			});
			$location.path('/edit-profile');
		});
	};	// End .updateGender

	$scope.updateBirthday = function(birthday){
		editProfileService.updateBirthday(birthday)
		.then(function(result){
			// console.log('Ctrl_result2', result);
			userDashboardService.getUserData().then(function(result){
				console.log('BIRTHDAY Ctrl_result', result);
				$scope.showUserData = result;
			});
			$location.path('/edit-profile');
		});
	};	// End .updateBirthday

	$scope.updateBio = function(bio){
		editProfileService.updateBio(bio)
		.then(function(result){
			// console.log('Ctrl_result2', result);
			userDashboardService.getUserData().then(function(result){
				console.log('BIO Ctrl_result', result);
				$scope.showUserData = result;
			});
			$location.path('/edit-profile');
		});
	};	// End .updateBio

	$scope.updateFoods = function(foodsObj){
		console.log('foodsObj in CTRL', foodsObj);
		editProfileService.updateFoods(foodsObj)
		.then(function(result){
			// console.log('Ctrl_result2', result);
			userDashboardService.getUserData().then(function(result){
				console.log('FOODS Ctrl_result', result);
				$scope.showUserData = result;
			});
			$location.path('/edit-profile');
		});
	};	// End .updateFoods

});	// End app.controller