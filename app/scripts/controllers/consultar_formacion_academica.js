'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:ConsultarFormacionAcademicaCtrl
 * @description
 * # ConsultarFormacionAcademicaCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('ConsultarFormacionAcademicaCtrl', function (formacionAcademicaServices, $rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


       var self = this;
    self.id = $rootScope.id;
    self.formacion_academica = {};
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
        field: 'ProgramaId.NombrePrograma', displayName: 'Programa', width: 200
      },
      {
        field: 'FechaInicio', displayName: 'Fecha Inicio', cellFilter: 'date:"yyyy-MM-dd"', width: 100
      },
      {
        field: 'FechaFinalizacion', displayName: 'Fecha Finalización', cellFilter: 'date:"yyyy-MM-dd"', width: 100
      },
      {
        field: 'Titulo.Nombre', displayName: 'Título', width: 300
      },
      {
        field: 'NombreProyecto', displayName: 'Nombre Proyecto', width: 500
      },
      {
        field: 'AreaConocimiento', displayName: 'Área de Conocimiento', width: 200
      },
      ]
    };
    self.gridOptions.multiSelect = false;
    var get_formacion_academica = function () {
      formacionAcademicaServices.get('formacion_academica', $.param({
        query: "Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptions.data = response.data;
        console.log(self.gridOptions.data);
      });
    };


    get_formacion_academica();


    self.gridOptions.onRegisterApi = function (gridApi) {
      self.gridApi = gridApi;
    };

  });
