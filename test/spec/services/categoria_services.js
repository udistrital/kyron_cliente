'use strict';

describe('Service: categoriaServices', function () {

  // load the service's module
  beforeEach(module('kyronApp'));

  // instantiate service
  var categoriaServices;
  beforeEach(inject(function (_categoriaServices_) {
    categoriaServices = _categoriaServices_;
  }));

  it('should do something', function () {
    expect(!!categoriaServices).toBe(true);
  });

});
