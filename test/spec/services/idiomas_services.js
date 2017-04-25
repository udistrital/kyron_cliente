'use strict';

describe('Service: idiomasServices', function () {

  // load the service's module
  beforeEach(module('kyronApp'));

  // instantiate service
  var idiomasServices;
  beforeEach(inject(function (_idiomasServices_) {
    idiomasServices = _idiomasServices_;
  }));

  it('should do something', function () {
    expect(!!idiomasServices).toBe(true);
  });

});
