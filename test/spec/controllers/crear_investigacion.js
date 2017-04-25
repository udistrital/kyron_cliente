'use strict';

describe('Controller: CrearInvestigacionCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var CrearInvestigacionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CrearInvestigacionCtrl = $controller('CrearInvestigacionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CrearInvestigacionCtrl.awesomeThings.length).toBe(3);
  });
});
