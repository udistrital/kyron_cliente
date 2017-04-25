'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:NotificacionesCtrl
 * @description
 * # NotificacionesCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('NotificacionesCtrl', function($scope, notificacion) {
    $scope.imagePath = 'images/yeoman.png';
    $scope.notificacion = notificacion;
  });
