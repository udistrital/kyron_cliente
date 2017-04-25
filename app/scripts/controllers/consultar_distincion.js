'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:ConsultarDistincionCtrl
 * @description
 * # ConsultarDistincionCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('ConsultarDistincionCtrl', function (distincionServices, $rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var self = this;
    self.id = $rootScope.id;
    self.vista_previa = false;
    self.gridOptions = {
      enableFiltering: true,
      enableSorting: true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      columnDefs: [{
        field: 'InstitucionId.NombreInstitucion', displayName: 'Institución', width: 400
      },
      {
        field: 'Nombre', displayName: 'Nombre', width: 200
      },
      {
        field: 'Fecha', displayName: 'Fecha', cellFilter: 'date:"yyyy-MM-dd"', width: 100
      },
      
      ]
    };
    self.gridOptions.multiSelect = false;
    var get_distincion = function () {
      distincionServices.get('distincion', $.param({
        query: "PersonaId:" + self.id + ",Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptions.data = response.data;
        console.log(self.gridOptions.data);
      });
    };

    get_distincion();

    self.gridOptions.onRegisterApi = function (gridApi) {
      self.gridApi = gridApi;
    };
  });