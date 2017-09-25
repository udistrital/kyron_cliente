'use strict';

/**
 * @ngdoc service
 * @name kyronApp.formacionAcademicaServices
 * @description
 * # formacionAcademicaServices
 * Factory in the kyronApp.
 */
angular.module('kyronApp')
  .factory('formacionAcademicaServices', function ($http) {
    // Service logic
    // ...
    var path = "http://10.20.2.17:8085/v1/";//8085

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
