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
  // .state('register', {
  //   url: "/register",
  //   templateUrl: "../templates/registerTmpl.html",
  //   controller: "registerCtrl"
  // })
  .state('userProfile', {
    url: "/username", // custom :username as url??
    templateUrl: "../templates/userProfileTmpl.html", // Each page only shows what's on this html page...
    controller: "userProfileCtrl"
  })
  .state('userProfile.userDashboard', {
    url: "/dashboard",
    templateUrl: "../templates/userProfileTmpl.userDashboard.html",
    controller: "userDashboardCtrl",
    // resolve: {
    //   authenticate: authenticate  
    // }
    data: {
      requireLogin: true
    }
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
  .state('userProfile.userDashboard.messages', {
    url: "/messages",
    templateUrl: "../templates/userProfileTmpl.messages.html",
    controller: "messagesCtrl"
  })
  .state('userProfile.userDashboard.messages.singleMessage', {
    url: "/:messageId",
    templateUrl: "../templates/userProfileTmpl.messages.singleMessage.html",
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

  // var authenticate = function($q, user, $state, $timeout){
  //   if (user.isAuthenticated()){
  //     return $q.when();
  //   } else {
  //     $timeout(function(){
  //       $state.go('login');
  //     })
  //     return $q.reject();
  //   }
  // };

}); // End app.config

// EVEN THOUGH LOGGED IN, WON'T REDIRECT TO DASHBOARD (GOES BACK TO LOGIN PAGE)
app.run(function($rootScope, $state, $location, userDashboardService) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
    userDashboardService.getUserData().then(function(response){
      console.log('loggedIn', response);
      console.log(toState);
      // console.log("Auth.isLoggedIn", Auth.isLoggedIn)
      // var shouldLogin = toState.data !== undefined && toState.data.requireLogin && !Auth.isLoggedIn;
      if (toState.url !== '/login' && toState.data.requireLogin && !response.facebookId){
        var shouldLogin = true;
      }
      // NOT authenticated - wants any private stuff
      console.log("before if");
      if (shouldLogin) {
        console.log("in if");
        $state.go('login');
        event.preventDefault();
        return;
      }
    });
  });
}); // End app.run
