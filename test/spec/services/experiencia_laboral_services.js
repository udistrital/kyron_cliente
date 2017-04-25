'use strict';

describe('Service: experienciaLaboralServices', function () {

  // load the service's module
  beforeEach(module('kyronApp'));

  // instantiate service
  var experienciaLaboralServices;
  beforeEach(inject(function (_experienciaLaboralServices_) {
    experienciaLaboralServices = _experienciaLaboralServices_;
  }));

  it('should do something', function () {
    expect(!!experienciaLaboralServices).toBe(true);
  });

});
