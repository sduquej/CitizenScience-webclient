'use strict';

describe('Controller: ListController', function () {
  beforeEach(module('webClientApp'));

  var vm;

  // Mock services
  var restAPI;
  var formConfig;

  // Recent contribution
  var today = new Date();
  // Contribution 40 days ago
  var oldDate = new Date();
  oldDate.setDate(oldDate.getDate() - 40);

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $q, $rootScope) {
    restAPI = {
      list: function(){}
    };

    spyOn(restAPI, 'list').
      and.returnValue($q.when([{
        timestamp: oldDate
      },{
        timestamp: today
      }]));

    formConfig = {
      jsonConfig: [],
      formFields: []
    };

    vm = $controller('ListController', {restAPI: restAPI, formConfig: formConfig});
    $rootScope.$apply();
  }));

  describe('All contributions', function () {
    it('should be an array', function () {
      expect(Array.isArray(vm.contributions)).toBeTruthy();
    });

    it('should have all contributions, regardless of date', function () {
      expect(vm.contributions.length).toBe(2);
    });

    it('should have as first element the most recent contribution', function () {
      expect(vm.contributions[0].timestamp).toBe(today);
    });

    it('should have as last element the oldest contribution', function () {
      expect(vm.contributions[1].timestamp).toBe(oldDate);
    });
  });

  describe('Last contributions', function () {
    it('should be an array', function () {
      expect(Array.isArray(vm.lastContributions)).toBeTruthy();
    });

    it('should exclude those older than a month', function () {
      expect(vm.lastContributions.length).toBe(1);
    });
  });

  describe('Last ten contributions', function () {
    it('should be array', function () {
      expect(Array.isArray(vm.lastTenContributions)).toBeTruthy();
    });

    it('should include contributions older than a month if they\'re in the 10 most recent', function () {
      expect(vm.lastTenContributions.length).toBe(2);
    });

    it('should have as first element the most recent contribution', function () {
      expect(vm.lastTenContributions[0].timestamp).toBe(today);
    });

    it('should have as last element the oldest contribution', function () {
      expect(vm.lastTenContributions[1].timestamp).toBe(oldDate);
    });
  });

});
