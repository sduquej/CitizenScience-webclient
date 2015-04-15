'use strict';

/**
 * @ngdoc controller
 * @name webClientApp.controller:MainController
 * @description
 * Controller for the Main view: the contribution form.
 * It refers the {@link webClientApp.service:formConfig formConfig} service to obtain the fields that make the form.
 * Form submission is deferred to the restAPI service that communicates with
 * the backend.
 */
angular.module('webClientApp')
  .controller('MainController', ['restAPI','formConfig', function (restAPI,formConfig) {

    var vm = this;

    /**
     * @ngdoc property
     * @name formData
     * @propertyOf webClientApp.controller:MainController
     * @description
     * Object that contains data from every input that has been used, as a property with
     * the corresponding `$modelValue`.
     */
    vm.formData = {};
    /**
     * @ngdoc property
     * @name formConfig
     * @propertyOf webClientApp.controller:MainController
     * @description
     * {@link webClientApp.service:formConfig#properties_formParameters formParameters}
     * object, it's injected from the
     * {@link webClientApp.service:formConfig formConfig} service.
     */
    vm.formConfig = formConfig;
    vm.resetForm = resetForm;
    vm.onSubmit = onSubmit;
    vm.loading = false;

    /**
     * @ngdoc method
     * @name clearElement
     * @methodOf webClientApp.controller:MainController
     * @description
     * Sets the value of the given element to undefined. The element must
     * exist in the {@link webClientApp.controller:MainController#properties_formData formData} object
     * @param {string} element
     *                 The element whose value will be set to <tt>undefined</tt>.
     */
    var clearElement = function(element){
      if(!vm.formData[element]){
        console.error('Error on clearElement: ' +
          element + ' is not part of the form.' +
          JSON.stringify(vm.formData));
        return;
      }
      vm.formData[element] = undefined;
    };

    /**
     * @ngdoc method
     * @name resetForm
     * @methodOf webClientApp.controller:MainController
     * @description
     * Calls {@link webClientApp.controller:MainController#methods_clearElement clearElement()}
     * on every element in the form and invokes the <tt>$setPristine()</tt>
     * and <tt>$setUntouched()</tt> functions in the form object.
     * @param {Object} form
     *                 The form object that is to be reset
     */
    function resetForm(form) {
      Object.keys(vm.formData).forEach(clearElement);
      if (form) {
        form.$setPristine();
        form.$setUntouched();
      }
    }

    /**
     * @ngdoc method
     * @name onSubmit
     * @methodOf webClientApp.controller:MainController
     * @description
     * Handles the form submission, doing the following:
     * <ol>
     *   <li> Toggles the <tt>loading</tt> flag, used to show a progress indicator and disable the button inputs</li>
     *   <li> Adds a timestamp with the current time to the {@link webClientApp.controller:MainController#properties_formData formData} object</li>
     *   <li> Invokes the {@link webClientApp.service:restAPI#methods_post post()} method of the {@link webClientApp.service:restAPI restAPI} service sending the {@link webClientApp.controller:MainController#properties_formData formData} object</li>
     *   <li> Notifies the user of the outcome of the submission and, if successful, invokes {@link webClientApp.controller:MainController#methods_resetForm resetForm()} to clean the form</li>
     *   <li> Toggles back the <tt>loading</tt> flag, no longer showing the progress indicator and enabling the button inputs</li>
     * </ol>
     */
    function onSubmit() {
      vm.loading = true;
      // Add timestamp to contribution
      vm.formData.timestamp = (new Date()).toJSON();
      restAPI.post(vm.formData)
        .success(function (data) {
          alert('Thanks for you contribution!');
          resetForm(vm.form);
        }).error(function (error) {
          alert('Something unexpected happened');
          console.error('ERROR :\n'+JSON.stringify(error));
        }).finally(function(){
          vm.loading = false;
        });
    }
  }])
;
