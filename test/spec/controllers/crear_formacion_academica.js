'use strict';

describe('Controller: CrearFormacionAcademicaCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var CrearFormacionAcademicaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CrearFormacionAcademicaCtrl = $controller('CrearFormacionAcademicaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CrearFormacionAcademicaCtrl.awesomeThings.length).toBe(3);
  });
});
