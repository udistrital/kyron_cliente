'use strict';

describe('Service: investigacionServices', function () {

  // load the service's module
  beforeEach(module('kyronApp'));

  // instantiate service
  var investigacionServices;
  beforeEach(inject(function (_investigacionServices_) {
    investigacionServices = _investigacionServices_;
  }));

  it('should do something', function () {
    expect(!!investigacionServices).toBe(true);
  });

});
