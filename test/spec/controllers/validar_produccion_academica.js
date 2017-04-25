'use strict';

describe('Controller: ValidarProduccionAcademicaCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var ValidarProduccionAcademicaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ValidarProduccionAcademicaCtrl = $controller('ValidarProduccionAcademicaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ValidarProduccionAcademicaCtrl.awesomeThings.length).toBe(3);
  });
});
