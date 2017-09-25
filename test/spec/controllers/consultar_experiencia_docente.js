'use strict';

describe('Controller: ConsultarExperienciaDocenteCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var ConsultarExperienciaDocenteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConsultarExperienciaDocenteCtrl = $controller('ConsultarExperienciaDocenteCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ConsultarExperienciaDocenteCtrl.awesomeThings.length).toBe(3);
  });
});
