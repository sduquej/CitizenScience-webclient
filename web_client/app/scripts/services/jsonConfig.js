/**
 * Created by sduquej on 28/02/2015.
 */
angular.module('webClientApp')
.factory('formConfig', function($http,$q) {
    var fileLocation = "data/form_fields.json";
    var formParameters = {
      //formFields: [],
      //jsonConfig: []
    };

    $http.get(fileLocation,{"cache":true}).success(function(data){
      console.log("data read:\n",data);
      formParameters.jsonConfig = data;
      formParameters.formFields = data.map(function(object){ return object['key']; });
    });

    return formParameters;
    //var get = function() {
    //  return $http.get(fileLocation,{"cache":true});
    //};
    //
    //return {
    //  listFormFields: function () {
    //    return [];
    //  },
    //  getFormInfo: get
    //};
  })
