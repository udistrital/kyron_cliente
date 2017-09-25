'use strict';

describe('Controller: ValidarFormacionAcademicaCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var ValidarFormacionAcademicaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ValidarFormacionAcademicaCtrl = $controller('ValidarFormacionAcademicaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ValidarFormacionAcademicaCtrl.awesomeThings.length).toBe(3);
  });
});
