'use strict';

describe('Controller: CrearProduccionAcademicaCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var CrearProduccionAcademicaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CrearProduccionAcademicaCtrl = $controller('CrearProduccionAcademicaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CrearProduccionAcademicaCtrl.awesomeThings.length).toBe(3);
  });
});
