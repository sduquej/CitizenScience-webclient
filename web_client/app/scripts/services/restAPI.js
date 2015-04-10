'use strict';
angular
  .module('webClientApp')
  .factory('restAPI', restAPI);

restAPI.$inject =['$http', '$upload'];

function restAPI($http, $upload) {
    // local
    // when testing from an external device, change the url to the intranet ip
    var base = 'http://localhost:9804';
    //remote
    //var base = "https://citscimurestapi.herokuapp.com";

  return {
      form: submitForm,
      list: listContributions
    };

  ////////////////////////////////////

  function submitForm(form) {
    return $upload.upload({
      url: base + '/api/v1/contributions/register',
      method: 'POST',
      fields: form,
      file: form.files || []
    }).progress(function (evt) {
      // Update the uploaded percentage to show on the progress bar
      if(form.files && form.files.length){
        form.files[0].progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      }
    });
  }

  function listContributions() {
    return $http.get(base + '/api/v1/contributions/list')
      .then(listContributionsComplete)
      .catch(listContributionsFailed);
  }

  function listContributionsComplete(response){
    console.log(response);
    return response.data;
  }

  function listContributionsFailed(error){
    console.error('error on list retrieval',error);
    // If an error occurs return no elements
    return [];
  }
}
