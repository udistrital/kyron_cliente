'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:ConsultarProduccionAcademicaCtrl
 * @description
 * # ConsultarProduccionAcademicaCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('ConsultarProduccionAcademicaCtrl', function (produccionAcademicaServices, $rootScope, $scope,$timeout, uiGridConstants) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

     var self = this;
    self.id = $rootScope.id;
    self.vista_previa = false;
    self.tr_produccion_academica = {};
    self.gridOptions = {
      enableFiltering: true,
      enableSorting: true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      columnDefs: [{
        field: 'PersonaId', displayName: 'Persona', width: 300
      },
        {
          field: 'TituloProduccion', displayName: 'Titulo Producción', width: 200
        },
        {
          field: 'FechaProduccion', displayName: 'Fecha Producción', width: 200, cellFilter: 'date:"yyyy-MM-dd"'
        },
        {
          field: 'Pais', displayName: 'País', width: 100
        },
        {
          field: 'Ciudad', width: 100
        },
        {
          field: 'SubtipoProduccionId.Nombre', displayName: 'Subtipo Producción', width: 300
        },

      ]
    };
    self.gridOptions.multiSelect = false;
    var get_produccion_academica = function () {
      produccionAcademicaServices.get('produccion_academica', $.param({
        query: "Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptions.data = response.data;
        console.log(self.gridOptions.data);
      });
    };

    var get_tipo_produccion = function () {
      produccionAcademicaServices.get('tipo_produccion', 'limit=0').then(function (response) {
        self.tipo_produccion = response.data;
      });
    };

    var get_subtipo_produccion = function () {
      produccionAcademicaServices.get('subtipo_produccion', 'limit=0').then(function (response) {
        self.subtipo_produccion = response.data;
      });
    };

    var get_opcion_dato = function () {
      produccionAcademicaServices.get('opcion_dato', 'limit=0').then(function (response) {
        self.opcion_dato = response.data;
      });
    };

    var get_dato_produccion = function () {
      produccionAcademicaServices.get('dato_produccion', $.param({
        query: "ProduccionAcademicaId.Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptionsDatoSubtipo.data = response.data;
      });
    };

    var get_evaluador = function () {
      produccionAcademicaServices.get('evaluador', $.param({
        query: "ProduccionAcademicaId.PersonaId:" + self.id + ",ProduccionAcademicaId.Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptionsEvaluador.data = response.data;
      });
    };

    get_produccion_academica();
    get_tipo_produccion();
    get_subtipo_produccion();
    get_opcion_dato();
    get_dato_produccion();
    get_evaluador();

    self.gridOptions.onRegisterApi = function (gridApi) {
      self.gridApi = gridApi;
    };


    self.gridOptionsDatoSubtipo = {};
    self.gridOptionsDatoSubtipo.enableFiltering = true;
    self.gridOptionsDatoSubtipo.treeRowHeaderAlwaysVisible = false;
    self.gridOptionsDatoSubtipo.columnDefs = [
      { field: 'ProduccionAcademicaId.TituloProduccion', displayName: 'Titulo Producción', cellTemplate: '<div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null || ( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div>', width: 200 },
      // pre-populated search field
      { field: 'DatoSubtipoId.DatoId.Nombre', displayName: 'Dato', width: 300 },
      // no filter input
      { field: 'Valor', headerCellClass: $scope.highlightFilteredHeader,cellFilter: 'filtroDatoProduccion:this' , width: 300 }
    ];
    self.gridOptionsDatoSubtipo.onRegisterApi = function (gridApi) {
      $timeout(function () {
        gridApi.grouping.clearGrouping();
        gridApi.grouping.groupColumn('ProduccionAcademicaId.TituloProduccion');
        gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
      });
    };


    self.gridOptionsEvaluador = {};
    self.gridOptionsEvaluador.enableFiltering = true;
    self.gridOptionsEvaluador.treeRowHeaderAlwaysVisible = false;
    self.gridOptionsEvaluador.columnDefs = [
      { field: 'ProduccionAcademicaId.TituloProduccion', displayName: 'Titulo Producción', cellTemplate: '<div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null || ( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div>', width: 200 },
      // pre-populated search field
      { field: 'PersonaId', displayName: 'Evaluador', width: 300 }
    ];
    self.gridOptionsEvaluador.onRegisterApi = function (gridApi) {
      $timeout(function () {
        gridApi.grouping.clearGrouping();
        gridApi.grouping.groupColumn('ProduccionAcademicaId.TituloProduccion');
        gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
      });
    };


  });
