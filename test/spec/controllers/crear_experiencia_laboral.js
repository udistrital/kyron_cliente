'use strict';

describe('Controller: CrearExperienciaLaboralCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var CrearExperienciaLaboralCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CrearExperienciaLaboralCtrl = $controller('CrearExperienciaLaboralCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CrearExperienciaLaboralCtrl.awesomeThings.length).toBe(3);
  });
});
