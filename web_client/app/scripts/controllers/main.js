'use strict';

/**
 * @ngdoc function
 * @name webClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webClientApp
 */
angular.module('webClientApp')
  .controller('MainController', ['restAPI','formConfig','$filter', function (restAPI,formConfig,$filter) {
    var keys = [],
      that = this;
    this.onSubmit = onSubmit;
    this.formData = {};
    this.formConfig = formConfig;

    //var fieldsPromise = formConfig.getFormInfo();
    //fieldsPromise.success(function (data) {
    //  that.formConfig = data;
    //  keys = that.formConfig.map(function(object){ return object['key'];});
    //  keys.forEach(clearElement, this);
    //});

    this.resetForm = resetForm;

    //this.formFields = [
    //  {
    //    //the key to be used in the model values {... "username": "johndoe" ... }
    //    key: 'email',
    //    type: 'input',
    //    templateOptions: {
    //      label: 'Email',
    //      type: 'email',
    //      placeholder: 'john.doe@domain.com',
    //      required: true
    //      //description: 'Descriptive text'
    //    }
    //  },
    //  {
    //    key: 'fname',
    //    type: 'input',
    //    templateOptions: {
    //      type: 'input',
    //      label: 'Forename',
    //      required: true
    //    }
    //  },
    //  {
    //    key: 'lname',
    //    type: 'input',
    //    templateOptions: {
    //      type: 'input',
    //      label: 'Surname',
    //      required: true
    //    }
    //  },
    //  {
    //    key: 'age',
    //    type: 'input',
    //    templateOptions: {
    //      type: 'range',
    //      min: '16',
    //      max: '50',
    //      value: '18',
    //      label: 'Age',
    //      required: true
    //    }
    //  },
    //  {
    //    key: 'gender',
    //    type: 'select',
    //    //default: 0,
    //    templateOptions: {
    //      label: 'Gender',
    //      options: [
    //        { name: "Female", value: "F"},
    //        { name: "Male", value: "M"},
    //        { name: "Do not specify", value: ""}
    //      ]
    //    }
    //  }
    //    //expressionProperties: {
    //    //  'templateOptions.disabled': '!model.username' // disabled when username is blank
    //    //}
    //];

    var clearElement = function(element, index, array){
      that.formData[element] = undefined;
    };

    function resetForm(form) {
      that.formConfig.formFields.forEach(clearElement, this);
      if (form) {
        form.$setPristine();
        form.$setUntouched();
      }
    };

    function onSubmit() {
      console.log('form submitted:', this.formData);

      restAPI.form({
        files: this.formData.file || [],
        email: this.formData.email || '',
        fname: this.formData.fname || '',
        lname: this.formData.lname || '',
        dob: this.formData.dob ? $filter('date')(new Date(this.formData.dob), 'yyyy/MM/dd') : '',
        age: this.formData.age || '',
        gender: this.formData.gender || '',
        timestamp: (new Date()).toJSON()
      }).success(function (data, status, headers, config) {
        console.log(data);
        alert("Data collected :D");
        resetForm(that.form);
      }).error(function (error) {
        alert("Something unexpected happened");
        console.log("ERROR :\n"+error.error);
      });
    };
  }])


;
