'use strict';

/**
 * @ngdoc overview
 * @name webClientApp
 * @description
 * # webClientApp
 *
 * Main module of the application.
 */
angular
  .module('webClientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'formly',
    'formlyBootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController as vm'
      })
      .when('/list', {
        templateUrl: 'views/list.html',
        controller: 'ListController as vm'
      })
      .when('/links', {
        templateUrl: 'views/links.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
