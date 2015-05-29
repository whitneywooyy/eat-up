var app = angular.module('eatUp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider
  .otherwise("/");

  //router here
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: "../templates/homeTmpl.html",
    controller: "homeCtrl"
  })
  .state('login', {
    url: "/login",
    templateUrl: "../templates/loginTmpl.html",
    controller: "loginCtrl"
  })
  // PUBLIC PROFILE
  // .state('myProfile', {
  //   url: "/user" + "/:myUsername",
  //   templateUrl: "../templates/userProfileTmpl.html",
  //   controller: "userProfileCtrl",
  //   resolve: {
  //     myRef: function(userProfileService, $stateParams){
  //       console.log("userRef resolve firing");
  //       console.log('$stateParams', $stateParams);
  //       console.log('$stateParams.myUsername', $stateParams.myUsername);
  //       return userProfileService.myPublicData($stateParams.myUsername);
  //     }
  //   }
  // })
  .state('userProfile', {
    url: "/user" + "/:username",
    templateUrl: "../templates/userProfileTmpl.html",
    controller: "userProfileCtrl",
    resolve: {
      userRef: function(userProfileService, $stateParams){
        console.log("userRef resolve firing");
        console.log('$stateParams', $stateParams);
        console.log('$stateParams.username', $stateParams.username);
        return userProfileService.userPublicData($stateParams.username);
      }
    }
  })
  // DASHBOARD
  .state('userDashboard', {
    url: "/dashboard",
    templateUrl: "../templates/userDashboardTmpl.html",
    controller: "userDashboardCtrl",
    data: {
      requireLogin: true
    }
  })
  // EDIT USER INFORMATION
  .state('editProfile', {
    url: "/edit-profile",
    templateUrl: "../templates/editProfileTmpl.html",
    controller: "userDashboardCtrl",
    data: {
      requireLogin: true
    }
  })
  .state('name', {
    url: "/edit-profile/name",
    templateUrl: "../templates/profileSettings/Tmpl.name.html",
    controller: "editProfileCtrl"
  })
  .state('username', {
    url: "/edit-profile/username",
    templateUrl: "../templates/profileSettings/Tmpl.username.html",
    controller: "editProfileCtrl"
  })
  .state('email', {
    url: "/edit-profile/email",
    templateUrl: "../templates/profileSettings/Tmpl.email.html",
    controller: "editProfileCtrl"
  })
  .state('password', {
    url: "/edit-profile/password",
    templateUrl: "../templates/profileSettings/Tmpl.password.html",
    controller: "editProfileCtrl"
  })
  .state('location', {
    url: "/edit-profile/location",
    templateUrl: "../templates/profileSettings/Tmpl.location.html",
    controller: "editProfileCtrl"
  })
  .state('gender', {
    url: "/edit-profile/gender",
    templateUrl: "../templates/profileSettings/Tmpl.gender.html",
    controller: "editProfileCtrl"
  })
  .state('birthday', {
    url: "/edit-profile/birthday",
    templateUrl: "../templates/profileSettings/Tmpl.birthday.html",
    controller: "editProfileCtrl"
  })
  .state('bio', {
    url: "/edit-profile/bio",
    templateUrl: "../templates/profileSettings/Tmpl.bio.html",
    controller: "editProfileCtrl"
  })
  .state('foods', {
    url: "/edit-profile/foods",
    templateUrl: "../templates/profileSettings/Tmpl.foods.html",
    controller: "editProfileCtrl"
  })
  .state('level', {
    url: "/edit-profile/level",
    templateUrl: "../templates/profileSettings/Tmpl.level.html",
    controller: "editProfileCtrl"
  })
  // DELETE ENTIRE PROFILE
  .state('deleteProfile', {
    url: "/edit-profile/delete-profile",
    templateUrl: "../templates/profileSettings/Tmpl.delete.html",
    controller: "editProfileCtrl"
  })
  // BROWSE SITE
  .state('browseUsers', {
    url: "/browse-users",
    templateUrl: "../templates/browseUsersTmpl.html",
    controller: "browseUsersCtrl"
  })
  .state('browseRestaurants', {
    url: "/browse-restaurants",
    templateUrl: "../templates/browseRestaurantsTmpl.html",
    controller: "browseRestaurantsCtrl"
  })
  // MESSAGES
  // .state('userProfile.userDashboard.messages', {
  //   url: "/messages",
  //   templateUrl: "../templates/messagesTmpl.html",
  //   controller: "messagesCtrl"
  // })
  // .state('userProfile.userDashboard.messages.singleMessage', {
  //   url: "/:messageId",
  //   templateUrl: "../templates/singleMessageTmpl.html",
  //   controller: "singleMessageCtrl"
  // })
  // FORUM
  // .state('forum', {
  //   url: "/forum",
  //   templateUrl: "../templates/forumMainTmpl.html",
  //   controller: "forumMainCtrl"
  // })
  // .state('forumTopic', {
  //   url: "/forum/:topic",
  //   templateUrl: "../templates/forumTopicTmpl.html",
  //   controller: "forumTopicCtrl"
  // })
  // .state('forumThread', {
  //   url: "/forum/:topic/:threadId",
  //   templateUrl: "../templates/forumThreadTmpl.html",
  //   controller: "forumThreadCtrl"
  // })

}); // End app.config

app.run(function($rootScope, $state, $location, userDashboardService) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
    userDashboardService.getUserData().then(function(response){
      // console.log('loggedIn', response);
      // console.log('toState', toState);
      // console.log("Auth.isLoggedIn", Auth.isLoggedIn)
      if (toState.url !== '/login' && toState.data.requireLogin && !response.facebookId){
        var shouldLogin = true;
      }
      // NOT authenticated - wants any private stuff
      if (shouldLogin) {
        $state.go('login');
        event.preventDefault();
        return;
      }
    });
  });
}); // End app.run
