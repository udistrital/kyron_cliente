'use strict';

describe('Filter: filtroDatoProduccion', function () {

  // load the filter's module
  beforeEach(module('kyronApp'));

  // initialize a new instance of the filter before each test
  var filtroDatoProduccion;
  beforeEach(inject(function ($filter) {
    filtroDatoProduccion = $filter('filtroDatoProduccion');
  }));

  it('Debe Retornar el nombre de la opción del dato si dentro del JSON hay una constante con valor select o el dato si el valor es input', function () {
    var scope = {row:{entity:{DatoSubtipoId:{Algo:'select'}}}};
    var value = 1;
    var salida = 1;
    expect(filtroDatoProduccion(value,scope)).toBe(salida);
  });

});
