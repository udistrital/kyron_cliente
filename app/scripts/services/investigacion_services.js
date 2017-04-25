'use strict';

/**
 * @ngdoc service
 * @name kyronApp.investigacionServices
 * @description
 * # investigacionServices
 * Factory in the kyronApp.
 */
angular.module('kyronApp')
  .factory('investigacionServices', function ($http) {
    // Service logic
    // ...

    var path = "http://localhost:8080/v1/";

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