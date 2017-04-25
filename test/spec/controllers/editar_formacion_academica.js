'use strict';

describe('Controller: EditarFormacionAcademicaCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var EditarFormacionAcademicaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditarFormacionAcademicaCtrl = $controller('EditarFormacionAcademicaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditarFormacionAcademicaCtrl.awesomeThings.length).toBe(3);
  });
});
