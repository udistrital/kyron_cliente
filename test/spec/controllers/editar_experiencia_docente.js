'use strict';

describe('Controller: EditarExperienciaDocenteCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var EditarExperienciaDocenteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditarExperienciaDocenteCtrl = $controller('EditarExperienciaDocenteCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditarExperienciaDocenteCtrl.awesomeThings.length).toBe(3);
  });
});
