'use strict';

describe('Controller: ConsultarDistincionCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var ConsultarDistincionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConsultarDistincionCtrl = $controller('ConsultarDistincionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ConsultarDistincionCtrl.awesomeThings.length).toBe(3);
  });
});
