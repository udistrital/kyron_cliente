'use strict';

describe('Controller: CrearExperienciaDocenteCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var CrearExperienciaDocenteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CrearExperienciaDocenteCtrl = $controller('CrearExperienciaDocenteCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CrearExperienciaDocenteCtrl.awesomeThings.length).toBe(3);
  });
});
