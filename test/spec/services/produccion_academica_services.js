'use strict';

describe('Service: produccionAcademicaServices', function () {

  // load the service's module
  beforeEach(module('kyronApp'));

  // instantiate service
  var produccionAcademicaServices;
  beforeEach(inject(function (_produccionAcademicaServices_) {
    produccionAcademicaServices = _produccionAcademicaServices_;
  }));

  it('should do something', function () {
    expect(!!produccionAcademicaServices).toBe(true);
  });

});
