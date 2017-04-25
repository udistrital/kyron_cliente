'use strict';

describe('Controller: EditarPersonaIdiomaCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var EditarPersonaIdiomaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditarPersonaIdiomaCtrl = $controller('EditarPersonaIdiomaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditarPersonaIdiomaCtrl.awesomeThings.length).toBe(3);
  });
});
