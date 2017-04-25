'use strict';

describe('Controller: ConsultarFormacionAcademicaCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var ConsultarFormacionAcademicaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConsultarFormacionAcademicaCtrl = $controller('ConsultarFormacionAcademicaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ConsultarFormacionAcademicaCtrl.awesomeThings.length).toBe(3);
  });
});
