'use strict';

describe('Controller: EditarExperienciaLaboralCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var EditarExperienciaLaboralCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditarExperienciaLaboralCtrl = $controller('EditarExperienciaLaboralCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditarExperienciaLaboralCtrl.awesomeThings.length).toBe(3);
  });
});
