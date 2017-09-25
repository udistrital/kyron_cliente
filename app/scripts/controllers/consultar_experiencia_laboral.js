'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:ConsultarExperienciaLaboralCtrl
 * @description
 * # ConsultarExperienciaLaboralCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('ConsultarExperienciaLaboralCtrl', function (experienciaLaboralServices, $rootScope) {
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
        field: 'PersonaId', displayName: 'Persona', width: 300
      },{
        field: 'InstitucionId.NombreInstitucion', displayName: 'Institución', width: 400
      },
      {
        field: 'Cargo', displayName: 'Cargo', width: 200
      },
      {
        field: 'FechaInicio', displayName: 'Fecha Inicio', cellFilter: 'date:"yyyy-MM-dd"', width: 100
      },
      {
        field: 'FechaFinalizacion', displayName: 'Fecha Finalización', cellFilter: 'date:"yyyy-MM-dd"', width: 100
      },
      ]
    };
    self.gridOptions.multiSelect = false;
    var get_experiencia_laboral = function () {
      experienciaLaboralServices.get('experiencia_laboral', $.param({
        query: "Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptions.data = response.data;
        console.log(self.gridOptions.data);
      });
    };


    get_experiencia_laboral();

    self.gridOptions.onRegisterApi = function (gridApi) {
      self.gridApi = gridApi;
    };
  });
