'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('IonicfireBoilerplate', [
  'ionic',
  'firebase',
  'IonicfireBoilerplate.controllers',
  'IonicfireBoilerplate.services'
])

.run(function($ionicPlatform, $rootScope, $state, FB, $firebaseSimpleLogin) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    var ref = new Firebase(FB);
    var loginObj = $firebaseSimpleLogin(ref);

    loginObj.$getCurrentUser().then(function(user){
       if(!user){
          $state.go('login');
       }
    },function(err){
      console.log(err);
    });

    $rootScope.$on('$firebaseSimpleLogin:login', function(e, user){
        $state.go('home');
    });

    $rootScope.$on('$firebaseSimpleLogin:logout', function(e,user){
        $state.go('login');
    });
  });
})

.constant('FB', 'https://blazing-fire-3134.firebaseio.com/')
.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home',{
        url: '/home',
        controller: 'MainCtrl',
        templateUrl: 'templates/main.html'
      })
      .state('login',{
        url: '/login',
        controller: "LoginCtrl",
        templateUrl: 'templates/login.html'
      })
      .state('signup',{
        url: '/signup',
        controller: 'SignupCtrl',
        templateUrl: 'templates/signup.html'
      });
}]);
