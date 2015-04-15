'use strict';
/**
 * @ngdoc service
 * @name webClientApp.service:formConfig
 * @description
 * <p>This service reads the form configuration file `data/form_fields.json` and
 * exposes it to the interested clients in the
 * {@link webClientApp.service:formConfig#properties_formParameters formParameters object}.</p>
 */
angular.module('webClientApp')
.factory('formConfig', function($http) {
    var fileLocation = 'data/form_fields.json';
    var formParameters = {};

    // Loads form fields configuration from json file and exposes it
    $http.get(fileLocation, { 'cache': true }).
      success(function(data){
        formParameters.jsonConfig = data;
        // Array with fields' unique id in db
        formParameters.formFields = data.map(function(object){ return object.key; });
      }).
      error(function(data, status){
        console.error('Could not load configuration file\n\t' +
          status + ' - ' + JSON.stringify(data));
      });

    /**
     * @ngdoc property
     * @name formParameters
     * @propertyOf webClientApp.service:formConfig
     * @description
     * Object with two properties:
     * <ul>
     *   <li>`jsonConfig`: the formly fields configuration array</li>
     *   <li>`formFields`: array with the `key` property of each of the fields</li>
     * </ul>
     */
    return formParameters;
  });
