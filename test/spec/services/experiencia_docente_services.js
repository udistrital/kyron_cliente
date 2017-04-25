'use strict';

describe('Service: experienciaDocenteServices', function () {

  // load the service's module
  beforeEach(module('kyronApp'));

  // instantiate service
  var experienciaDocenteServices;
  beforeEach(inject(function (_experienciaDocenteServices_) {
    experienciaDocenteServices = _experienciaDocenteServices_;
  }));

  it('should do something', function () {
    expect(!!experienciaDocenteServices).toBe(true);
  });

});
