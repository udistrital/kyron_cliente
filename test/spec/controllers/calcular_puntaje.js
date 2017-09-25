'use strict';

describe('Controller: CalcularPuntajeCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var CalcularPuntajeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CalcularPuntajeCtrl = $controller('CalcularPuntajeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CalcularPuntajeCtrl.awesomeThings.length).toBe(3);
  });
});
