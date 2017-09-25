'use strict';

/**
 * @ngdoc service
 * @name kyronApp.categoriaServices
 * @description
 * # categoriaServices
 * Factory in the kyronApp.
 */
angular.module('kyronApp')
  .factory('categoriaServices', function ($http) {
    // Service logic
    // ...
    var path = "http://10.20.2.17:8081/v1/"; // puerto 8081

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
