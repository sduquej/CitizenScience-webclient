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
  .config(function ($routeProvider,formlyConfigProvider) {
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

    // Restrict date fields max value to the current date
    formlyConfigProvider.templateManipulators.preWrapper.push(function(template, options, scope) {
      var _to = options.templateOptions,
        today = (new Date()).toISOString().slice(0,10);
      if (options.type === 'input' && _to.type === 'date') {
        _to.max = today;
      }
      return template;
    });
  });
