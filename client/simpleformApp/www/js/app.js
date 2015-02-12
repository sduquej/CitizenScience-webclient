// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('simpleForm', ['ionic', 'simpleForm.controllers', 'simpleForm.services'])
    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('auth', {
                url: "/auth",
                abstract: true,
                templateUrl: "templates/auth.html"
            })
            .state('auth.form', {
                url: '/form',
                views: {
                    'auth-form' : {
                        templateUrl: 'templates/auth-form.html',
                        controller: 'SimpleCtrl'
                    }
                }
            })
        $urlRouterProvider.otherwise('/auth/form');
        //$urlRouterProvider.otherwise('/simple-form');
    })

