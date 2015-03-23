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
    //var base = "https://floating-island-8148.herokuapp.com/";

    return {
      form: submitForm,
      list: listContributions,

      //TODO: remove if it's not going to be used
      uploadFile: function (files) {
        if(files && files.length) {
          console.log(files);
          $upload.upload({
            url: base + '/api/v1/simpleForm/upload',
            method: 'POST',
            data: {}, // data, // Any data needed to be submitted along with the files
            file: files
          }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
          }).success(function (data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
            return 'Success!';
          });
        }
      }
    };

  ////////////////////////////////////

  function submitForm(form) {
    // OLD
    //return $http.post(base + '/api/v1/simpleForm/register', form);
    //  Multiform attempt
    return $upload.upload({
      url: base + '/api/v1/simpleForm/register',
      method: 'POST',
      fields: form,
      //data: form, // data, // Any data needed to be submitted along with the files
      file: form.files
      //fileName: form.timestamp + '_' + form.files[0].name
    }).progress(function (evt) {
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
    });
  }

  function listContributions() {
    return $http.get(base + '/api/v1/simpleForm/list')
      .then(listContributionsComplete)
      .catch(listContributionsFailed);
  }

  function listContributionsComplete(response){
    console.log(response);
    return response.data;
  }

  function listContributionsFailed(error){
    console.error('error on list retrieval',error);
    // If an error occurs give back dummy data
    return [{
      email: 'dummy Email',
      fname: 'dummy Name',
      lname: 'dummy LastName',
      age: '25',
      gender: 'M'
    },
      {
        email: 'dummy@Email.2',
        fname: 'dummy Name',
        lname: 'dummy LastName',
        age: '25',
        gender: 'F'
      }];
  }
}
