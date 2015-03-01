"use strict";
angular.module('webClientApp')
  .factory('restAPI', function($http) {
    var base = "https://floating-island-8148.herokuapp.com/";

    return {
      form: function (form) {
        return $http.post(base + '/api/v1/simpleForm/register', form);
      },

      list: function () {
        return $http.get(base + '/api/v1/simpleForm/list', {
          method: 'GET',
          params: {}
        });
      }
    };
  })
