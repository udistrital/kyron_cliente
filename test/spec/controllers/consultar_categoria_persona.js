'use strict';

describe('Controller: ConsultarCategoriaPersonaCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var ConsultarCategoriaPersonaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConsultarCategoriaPersonaCtrl = $controller('ConsultarCategoriaPersonaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ConsultarCategoriaPersonaCtrl.awesomeThings.length).toBe(3);
  });
});
