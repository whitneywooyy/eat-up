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
  .state('userProfile', {
    url: "/username", // custom :username as url??
    templateUrl: "../templates/userProfileTmpl.html",
    controller: "userProfileCtrl"
  })
    .state('userProfile.userDashboard', {
      url: "/dashboard",
      templateUrl: "../templates/userDashboardTmpl.html",
      controller: "userDashboardCtrl",
      data: {
        requireLogin: true
      }
    })
      .state('userProfile.userDashboard.messages', {
        url: "/messages",
        templateUrl: "../templates/messagesTmpl.html",
        controller: "messagesCtrl"
      })
        .state('userProfile.userDashboard.messages.singleMessage', {
          url: "/:messageId",
          templateUrl: "../templates/singleMessageTmpl.html",
          controller: "singleMessageCtrl"
        })
      .state('userProfile.userDashboard.editProfile', {
        url: "/edit-profile",
        templateUrl: "../templates/editProfileTmpl.html",
        controller: "userDashboardCtrl",
        data: {
          requireLogin: true
        }
      })
        .state('userProfile.userDashboard.editProfile.name', {
          url: "/name",
          templateUrl: "../templates/profileSettings/Tmpl.name.html",
          controller: "editProfileCtrl"
        })
        .state('userProfile.userDashboard.editProfile.username', {
          url: "/username",
          templateUrl: "../templates/profileSettings/Tmpl.username.html",
          controller: "editProfileCtrl"
        })
        .state('userProfile.userDashboard.editProfile.email', {
          url: "/email",
          templateUrl: "../templates/profileSettings/Tmpl.email.html",
          controller: "editProfileCtrl"
        })
        .state('userProfile.userDashboard.editProfile.password', {
          url: "/password",
          templateUrl: "../templates/profileSettings/Tmpl.password.html",
          controller: "editProfileCtrl"
        })
        .state('userProfile.userDashboard.editProfile.location', {
          url: "/location",
          templateUrl: "../templates/profileSettings/Tmpl.location.html",
          controller: "editProfileCtrl"
        })
        .state('userProfile.userDashboard.editProfile.gender', {
          url: "/gender",
          templateUrl: "../templates/profileSettings/Tmpl.gender.html",
          controller: "editProfileCtrl"
        })
        .state('userProfile.userDashboard.editProfile.birthday', {
          url: "/birthday",
          templateUrl: "../templates/profileSettings/Tmpl.birthday.html",
          controller: "editProfileCtrl"
        })
        .state('userProfile.userDashboard.editProfile.bio', {
          url: "/bio",
          templateUrl: "../templates/profileSettings/Tmpl.bio.html",
          controller: "editProfileCtrl"
        })
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
  
  
  // FORUM STATES

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
