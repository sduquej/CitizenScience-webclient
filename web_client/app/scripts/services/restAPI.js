'use strict';

/**
 * @ngdoc service
 * @name webClientApp.service:restAPI
 * @description
 * <p>This service handles all the interaction with the backend, RESTful, server.
 * It exposes two methods, one for submitting and one for retrieving data; they both
 * hit the endpoint configured  {@link webClientApp.service:restAPI#properties_base here}.</p>
 *
 * <p>It uses Angular's <tt>$http</tt> service and the open source
 * {@link https://github.com/danialfarid/ng-file-upload ng-file-upload directive}.</p>
 */
angular
  .module('webClientApp')
  .factory('restAPI', restAPI);

restAPI.$inject =['$http', '$upload'];

function restAPI($http, $upload) {
  /**
   * @ngdoc property
   * @name base
   * @propertyOf webClientApp.service:restAPI
   * @description
   * String with the base url of the backend REST server. If using a local instance it is okay to use
   * `localhost`, however it is recommended to use the local IP address to test from external
   * devices (that are on the same network).
   * @example
   * For a local backend server (deployed on the same machine)
      ```javascript
      // local instance on port 9804
      var base = 'http://localhost:9804';
     ```
     Using the intranet IP
     ```javascript
      // suggested use, with the intranet IP
      var base = 'http://192.168.1.35:9804';
      ```
      Remote REST server
      ```javascript
      // url with hostname
      var base = 'https://your.domain.com';
      ```
   */
  var base = 'https://citscimurestapi.herokuapp.com';

  return {
      post: post,
      list: listContributions
    };

  ////////////////////////////////////

  /**
   * @ngdoc method
   * @name post
   * @propertyOf webClientApp.service:restAPI
   * @description
   * <p>This method hits the `/api/v1/contributions/register` endpoint of
   * the {@link webClientApp.service:restAPI#properties_base base url} with the `POST`
   * method. If a file was submitted, the progress of the upload is updated on the
   * {@link webClientApp.controller:MainController#properties_formData formData} object.
   * @param {Object} form
   *                 object whose properties are the fields that will be posted
   * @returns {HttpPromise}
   *        A promise with the result of the upload
   */
  function post(form) {
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

  /**
   * @ngdoc method
   * @name list
   * @propertyOf webClientApp.service:restAPI
   * @description
   * <p>This method hits the `/api/v1/contributions/list` endpoint of
   * the {@link webClientApp.service:restAPI#properties_base base url} with the `GET`
   * method. If a file was submitted, the progress of the upload is updated on the
   * {@link webClientApp.controller:MainController#properties_formData formData} object.
   * @returns {Array}
   *        Data returned from the backend or an empty array if there was an error.
   */
  function listContributions() {
    return $http.get(base + '/api/v1/contributions/list')
      .then(listContributionsComplete)
      .catch(listContributionsFailed);
  }

  function listContributionsComplete(response){
    return response.data;
  }

  function listContributionsFailed(error){
    console.error('error on list retrieval',error);
    // If an error occurs return no elements
    return [];
  }
}
