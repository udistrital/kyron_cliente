'use strict';

describe('Controller: ValidarExperienciaDocenteCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var ValidarExperienciaDocenteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ValidarExperienciaDocenteCtrl = $controller('ValidarExperienciaDocenteCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ValidarExperienciaDocenteCtrl.awesomeThings.length).toBe(3);
  });
});
