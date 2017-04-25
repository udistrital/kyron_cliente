'use strict';

describe('Controller: EditarProduccionAcademicaCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var EditarProduccionAcademicaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditarProduccionAcademicaCtrl = $controller('EditarProduccionAcademicaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditarProduccionAcademicaCtrl.awesomeThings.length).toBe(3);
  });
});
