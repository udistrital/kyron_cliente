'use strict';

describe('Controller: ConsultarInvestigacionCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var ConsultarInvestigacionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConsultarInvestigacionCtrl = $controller('ConsultarInvestigacionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ConsultarInvestigacionCtrl.awesomeThings.length).toBe(3);
  });
});
