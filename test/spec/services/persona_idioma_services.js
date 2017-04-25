'use strict';

describe('Service: personaIdiomaServices', function () {

  // load the service's module
  beforeEach(module('kyronApp'));

  // instantiate service
  var personaIdiomaServices;
  beforeEach(inject(function (_personaIdiomaServices_) {
    personaIdiomaServices = _personaIdiomaServices_;
  }));

  it('should do something', function () {
    expect(!!personaIdiomaServices).toBe(true);
  });

});
