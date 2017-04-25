'use strict';

describe('Controller: ConsultarProduccionAcademicaCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var ConsultarProduccionAcademicaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConsultarProduccionAcademicaCtrl = $controller('ConsultarProduccionAcademicaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ConsultarProduccionAcademicaCtrl.awesomeThings.length).toBe(3);
  });
});
