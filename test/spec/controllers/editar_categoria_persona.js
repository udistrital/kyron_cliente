'use strict';

describe('Controller: EditarCategoriaPersonaCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var EditarCategoriaPersonaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditarCategoriaPersonaCtrl = $controller('EditarCategoriaPersonaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditarCategoriaPersonaCtrl.awesomeThings.length).toBe(3);
  });
});
