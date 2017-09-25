'use strict';

describe('Controller: ValidarCategoriaPersonaCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var ValidarCategoriaPersonaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ValidarCategoriaPersonaCtrl = $controller('ValidarCategoriaPersonaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ValidarCategoriaPersonaCtrl.awesomeThings.length).toBe(3);
  });
});
