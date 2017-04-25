'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:ConsultarInvestigacionCtrl
 * @description
 * # ConsultarInvestigacionCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('ConsultarInvestigacionCtrl', function (investigacionServices,  $rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

       var self = this;
    self.id = $rootScope.id;
    self.investigacion = {};
    self.gridOptions = {
      enableFiltering: true,
      enableSorting: true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      columnDefs: [{
        field: 'InstitucionId.NombreInstitucion', displayName: 'Institución', width: 400
      },
      {
        field: 'TipoInvestigacionId.NombreTipoInvestigacion', displayName: 'Tipo Investigación', width: 200
      },
      {
        field: 'FechaInicio', displayName: 'Fecha Inicio', cellFilter: 'date:"yyyy-MM-dd"', width: 100
      },
      {
        field: 'FechaFinalizacion', displayName: 'Fecha Finalización', cellFilter: 'date:"yyyy-MM-dd"', width: 100
      },
      {
        field: 'TipoInvestigacion', displayName: 'Tipo Investigacion', width: 300
      },
      {
        field: 'NombreInvestigacion', displayName: 'Nombre Investigacion', width: 500
      },
      ]
    };
    self.gridOptions.multiSelect = false;
    var get_investigacion = function () {
      investigacionServices.get('investigacion', $.param({
        query: "PersonaId:" + self.id + ",Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptions.data = response.data;
        console.log(self.gridOptions.data);
      });
    };


    get_investigacion();


    self.gridOptions.onRegisterApi = function (gridApi) {
      self.gridApi = gridApi;
    };

  });
