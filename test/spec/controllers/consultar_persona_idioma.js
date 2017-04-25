'use strict';

describe('Controller: ConsultarPersonaIdiomaCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var ConsultarPersonaIdiomaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConsultarPersonaIdiomaCtrl = $controller('ConsultarPersonaIdiomaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ConsultarPersonaIdiomaCtrl.awesomeThings.length).toBe(3);
  });
});
