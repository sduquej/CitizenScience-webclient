'use strict';
describe('Controller: MainController', function () {
  beforeEach(module('webClientApp'));

  var vm;
  var rootScope;
  var form;

  // Mock services
  var restAPI;
  var formConfig;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q, $compile) {
    rootScope = $rootScope;

    restAPI = {
      post: function(){}
    };

    spyOn(restAPI, 'post').
      and.returnValue($q.when({then: function(callback){return callback({});}}));

    formConfig = {
      jsonConfig: [],
      formFields: []
    };

    vm = $controller('MainController', {restAPI: restAPI, formConfig: formConfig});

    var element = angular.element(
      '<form name="form">' +
        '<input ng-model="formData[\'name\']" name="name" type="text"/>' +
        '<input ng-model="formData[\'age\']" name="age" type="number"/>' +
      '</form>'
    );
    rootScope.formData = {
      "name": null,
      "age": null
    };
    $compile(element)(rootScope);

    vm.form = rootScope.form;

    vm.formData = rootScope.formData;
    rootScope.$apply();
  }));

  describe('on init', function () {
    it('should have a loading flag set to false', function () {
      expect(vm.loading).toBe(false);
    });

    it('should have a formData object', function () {
      expect(typeof vm.formData).toBe('object');
    });

    it('should have a form object', function () {
      expect(typeof vm.form).toBe('object');
    });
  });

  describe('on submit', function () {
    beforeEach(function(){
      vm.form.name.$setViewValue('Tester');
      vm.form.age.$setViewValue(18);
      rootScope.$digest();
      vm.onSubmit();
    });

    it('should have a loading flag set to true', function () {
      expect(vm.loading).toBe(true);
    });

    it('should have added a timestamp property', function () {
      expect(vm.formData.timestamp).toBeDefined();
    });

    describe('after resolving the promise', function () {
      beforeEach(function(){
        rootScope.$apply();
      });
      it('should have a loading flag set to false', function () {
        expect(vm.loading).toBe(false);
      });

      it('should reset the form\'s datafields', function () {
        expect(vm.formData.name).not.toBeDefined();
        expect(vm.formData.age).not.toBeDefined();
        expect(vm.formData.timestamp).not.toBeDefined();
      });
    });
  });
});
