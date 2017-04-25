'use strict';

describe('Service: formacionAcademicaServices', function () {

  // load the service's module
  beforeEach(module('kyronApp'));

  // instantiate service
  var formacionAcademicaServices;
  beforeEach(inject(function (_formacionAcademicaServices_) {
    formacionAcademicaServices = _formacionAcademicaServices_;
  }));

  it('should do something', function () {
    expect(!!formacionAcademicaServices).toBe(true);
  });

});
