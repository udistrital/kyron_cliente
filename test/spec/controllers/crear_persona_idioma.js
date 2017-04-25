'use strict';

describe('Controller: CrearPersonaIdiomaCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var CrearPersonaIdiomaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CrearPersonaIdiomaCtrl = $controller('CrearPersonaIdiomaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CrearPersonaIdiomaCtrl.awesomeThings.length).toBe(3);
  });
});
