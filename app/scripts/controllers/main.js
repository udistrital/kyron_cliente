'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('MainCtrl', function ($rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    var self = this;

    self.login= function(){
      $rootScope.id = self.Id;
      $rootScope.rol = self.Rol;
    };
  });
