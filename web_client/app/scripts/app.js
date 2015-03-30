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
    'formlyBootstrap',
    'angularFileUpload',
    'angularMoment'
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
      .when('/upload', {
        templateUrl: 'views/fileUpload.html'
        //controller: 'UploadController as vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
