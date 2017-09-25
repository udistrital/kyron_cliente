'use strict';

describe('Controller: CrearCategoriaPersonaCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var CrearCategoriaPersonaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CrearCategoriaPersonaCtrl = $controller('CrearCategoriaPersonaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CrearCategoriaPersonaCtrl.awesomeThings.length).toBe(3);
  });
});
