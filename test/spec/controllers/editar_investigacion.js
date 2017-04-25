'use strict';

describe('Controller: EditarInvestigacionCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var EditarInvestigacionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditarInvestigacionCtrl = $controller('EditarInvestigacionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditarInvestigacionCtrl.awesomeThings.length).toBe(3);
  });
});
