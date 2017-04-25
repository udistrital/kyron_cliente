'use strict';

describe('Controller: ConsultarExperienciaLaboralCtrl', function () {

  // load the controller's module
  beforeEach(module('kyronApp'));

  var ConsultarExperienciaLaboralCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConsultarExperienciaLaboralCtrl = $controller('ConsultarExperienciaLaboralCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('Debe estar definida la variable id', function () {
    expect(ConsultarExperienciaLaboralCtrl.id).toBeDefined();
  });

  it('Debe estar definida la variable vista previa', function () {
    expect(ConsultarExperienciaLaboralCtrl.vista_previa).toBeDefined();
  });

  it('Debe estar definida la variable grid options', function () {
    expect(ConsultarExperienciaLaboralCtrl.gridOptions).toBeDefined();
  });

  it('La variable gridOptions.multiSelect debe ser false ', function () {
    expect(ConsultarExperienciaLaboralCtrl.gridOptions.multiSelect).toBe(false);
  });

});
