'use strict';

/**
 * @ngdoc service
 * @name kyronApp.experienciaDocenteServices
 * @description
 * # experienciaDocenteServices
 * Factory in the kyronApp.
 */
angular.module('kyronApp')
  .factory('experienciaDocenteServices', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
