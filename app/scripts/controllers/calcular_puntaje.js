'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:CalcularPuntajeCtrl
 * @description
 * # CalcularPuntajeCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('CalcularPuntajeCtrl', function ($rootScope, categoriaServices, experienciaDocenteServices, experienciaLaboralServices, formacionAcademicaServices, produccionAcademicaServices,$timeout, uiGridConstants, $scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    var self = this;
    self.id = $rootScope.Id;

  //tabla de categoria_persona
    self.gridOptionsCategoria = {
      enableFiltering: true,
      enableSorting: true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      columnDefs: [{
        field: 'IdTipoCategoria.NombreCategoria', displayName: 'Categoria', width: 400
      },
      {
        field: 'FechaDato', displayName: 'Fecha', cellFilter: 'date:"yyyy-MM-dd"', width: 100
      },
      ]
    };


    var get_categoria_persona = function () {
      categoriaServices.get('categoria_persona', $.param({
        query: "PersonaId:" + self.id + ",Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptionsCategoria.data = response.data;

      });
    };




//Tabla de Experiencia Laboral
    self.gridOptionsExperienciaLaboral = {
      enableFiltering: true,
      enableSorting: true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      columnDefs: [{
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


    var get_experiencia_laboral = function () {
      experienciaLaboralServices.get('experiencia_laboral', $.param({
        query: "PersonaId:" + self.id + ",Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptionsExperienciaLaboral.data = response.data;
        console.log(self.gridOptions.data);
      });
    };

    //Tabla de Formacion Academcia

    self.gridOptionsFormacionAcademica = {
      enableFiltering: true,
      enableSorting: true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      columnDefs: [{
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
    var get_formacion_academica = function () {
      formacionAcademicaServices.get('formacion_academica', $.param({
        query: "PersonaId:" + self.id + ",Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptionsFormacionAcademica.data = response.data;
      });
    };


    //tabla Produccion Academica
    self.gridOptionsDatoSubtipo = {
      enableFiltering: true,
      enableSorting: true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      columnDefs: [
        { field: 'ProduccionAcademicaId.TituloProduccion', displayName: 'Titulo Producción', cellTemplate: '<div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null || ( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div>', width: 200 },
        // pre-populated search field
        { field: 'DatoSubtipoId.DatoId.Nombre', displayName: 'Dato', width: 300 },
        // no filter input
        { field: 'Valor', headerCellClass: $scope.highlightFilteredHeader,cellFilter: 'filtroDatoProduccion:this' , width: 300 }
      ]
    };

    self.gridOptionsDatoSubtipo.onRegisterApi = function (gridApi) {
      $timeout(function () {
        gridApi.grouping.clearGrouping();
        gridApi.grouping.groupColumn('ProduccionAcademicaId.TituloProduccion');
        gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
      });
    };

    var get_dato_produccion = function () {
      produccionAcademicaServices.get('dato_produccion', $.param({
        query: "ProduccionAcademicaId.PersonaId:" + self.id + ",ProduccionAcademicaId.Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptionsDatoSubtipo.data = response.data;
      });
    };


//Cargar Datos
  get_categoria_persona();
  get_dato_produccion();
  get_experiencia_laboral();
  get_formacion_academica();

  });
