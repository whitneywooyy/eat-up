var app = angular.module('eatUp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider
    .otherwise("/");

    //router here
    $stateProvider
    .state('home', {
      url: '/'
    })
    .state('login', {
      url: "/login",
      templateUrl: "../templates/loginTmpl.html",
      controller: "loginCtrl"
    })
    .state('register', {
      url: "/register",
      templateUrl: "../templates/registerTmpl.html",
      controller: "registerCtrl"
    })
    .state('userProfile', {
      url: "/:username",
      templateUrl: "../templates/userProfileTmpl.html",
      controller: "userProfileCtrl"
    })
    .state('userProfile.userDashboard', {
      url: "/dashboard",
      templateUrl: "../templates/userProfile.userDashboard.html",
      controller: "userDashboardCtrl"
      // Need resolve?
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
    .state('userProfile.messages', {
      url: "/messages",
      templateUrl: "../templates/userProfile.messages.html",
      controller: "messagesCtrl"
      // Need resolve?
    })
    .state('userProfile.messages.singleMessage', {
      url: "/:messageId",
      templateUrl: "../templates/userProfile.messages.singleMessage.html",
      controller: "singleMessageCtrl"
      // Need resolve?
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
})
})
