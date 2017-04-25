'use strict';

describe('Service: distincionServices', function () {

  // load the service's module
  beforeEach(module('kyronApp'));

  // instantiate service
  var distincionServices;
  beforeEach(inject(function (_distincionServices_) {
    distincionServices = _distincionServices_;
  }));

  it('should do something', function () {
    expect(!!distincionServices).toBe(true);
  });

});
