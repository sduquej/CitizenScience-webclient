/**
 * Created by sduquej on 28/02/2015.
 */
'use strict';
angular.module('webClientApp')
.factory('formConfig', function($http) {
    var fileLocation = 'data/form_fields.json';
    var formParameters = {};

    // Loads form fields configuration from json file and exposes it
    $http.get(fileLocation, { 'cache': true }).success(function(data){
      formParameters.jsonConfig = data;
      // Array with fields' unique id in db
      formParameters.formFields = data.map(function(object){ return object.key; });
    });

    return formParameters;
  });
