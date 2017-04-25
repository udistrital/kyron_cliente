'use strict';

/**
 * @ngdoc service
 * @name kyronApp.experienciaLaboralServices
 * @description
 * # experienciaLaboralServices
 * Factory in the kyronApp.
 */
angular.module('kyronApp')
  .factory('experienciaLaboralServices', function ($http) {
    // Service logic
    // ...
    var path = "http://localhost:8082/v1/";

    // Public API here
    return {
      get: function (tabla, params) {
        return $http.get(path + tabla + "/?" + params);
      },
      post: function (tabla, elemento){
        return $http.post(path + tabla, elemento);
      },
      put: function (tabla,id,elemento){
        return $http.put(path+tabla+"/"+id,elemento);
      },
      delete: function(tabla, id){
        return $http.delete(path+tabla+"/"+id);
      }
    };
  });
