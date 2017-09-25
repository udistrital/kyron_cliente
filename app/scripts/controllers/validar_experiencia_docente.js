'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:ValidarExperienciaDocenteCtrl
 * @description
 * # ValidarExperienciaDocenteCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('ValidarExperienciaDocenteCtrl', function (experienciaDocenteServices,$rootScope, $scope,$timeout, uiGridConstants) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
   var self = this;
    self.id = $rootScope.id;
    self.vista_previa = false;
    self.tr_experiencia_docente = {};
    self.gridOptions = {
      enableFiltering: true,
      enableSorting: true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      columnDefs: [{
        field: 'PersonaId', displayName: 'Persona', width: 300
      },
        {
          field: 'InstitucionId.NombreInstitucion', displayName: 'Institucion', width: 200
        },
        {
          field: 'TipoActividad', displayName: 'Tipo Actividad', width: 200
        },
        {
          field: 'CampoEnseñanza', displayName: 'Campo de Enseñanza', width: 100
        },
        {
          field: 'FechaInicio', displayName: 'Fecha Incio', width: 100, cellFilter: 'date:"yyyy-MM-dd"'
        },
        {
          field: 'FechaFinalizacion', displayName: 'Fecha Fin', width: 100, cellFilter: 'date:"yyyy-MM-dd"'
        },
        {
          field: 'TipoDedicacionId.NombreTipoDedicacion', displayName: 'Tipo Dedicacion', width: 300
        },
        {
        name: 'Acción',
        width: 70,
        cellEditableCondition: false,
        cellTemplate: '  <div ng-if="row.entity.Validacion == false"> <button class="btn btn-success btn-sm" ng-click="grid.appScope.validarExperienciaDocente.validar(row.entity.Id, row.entity)"> <span class="glyphicon glyphicon-ok-sign"></span>Validar</button> </div>',
      },

      ]
    };
    self.gridOptions.multiSelect = false;
    var get_experiencia_docente = function () {
      experienciaDocenteServices.get('experiencia_docente', $.param({
        query: "Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptions.data = response.data;
        console.log(self.gridOptions.data);
      });
    };



    var get_cursos = function () {
      experienciaDocenteServices.get('cursos', $.param({
        query: "ExperienciaDocenteId.Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptionsCursos.data = response.data;
      });
    };

    get_experiencia_docente();
    get_cursos();


    self.gridOptions.onRegisterApi = function (gridApi) {
      self.gridApi = gridApi;
    };


    self.gridOptionsCursos = {};
    self.gridOptionsCursos.enableFiltering = true;
    self.gridOptionsCursos.treeRowHeaderAlwaysVisible = false;
    self.gridOptionsCursos.columnDefs = [
      { field: 'ExperienciaDocenteId.PersonaId', displayName: 'Persona', cellTemplate: '<div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null || ( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div>', width: 200 },
      { field: 'ExperienciaDocenteId.InstitucionId.NombreInstitucion', displayName: 'Institucion', cellTemplate: '<div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null || ( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div>', width: 200 },
      // pre-populated search field
      { field: 'NombreCurso', displayName: 'Curso', width: 300 }
      // no filter input

    ];
    self.gridOptionsCursos.onRegisterApi = function (gridApi) {
      $timeout(function () {
        gridApi.grouping.clearGrouping();
        gridApi.grouping.groupColumn('ExperienciaDocenteId.PersonaId');
        gridApi.grouping.groupColumn('ExperienciaDocenteId.InstitucionId.NombreInstitucion');
        gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
      });
    };

    self.validar = function (id, experiencia_docente) {
      swal({
        title: 'Está seguro?',
        text: "No podrá revertir esto!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Validar'
      }).then(function () {
        experiencia_docente.Validacion = true;
        experienciaDocenteServices.put('experiencia_docente', id, experiencia_docente).then(function (response) {
          if (response.data === 'OK') {

            swal(
              'Buen trabajo!',
              'Se validó correctamente!',
              'success'
            );
            get_experiencia_docente();

          } else {
            swal(
              'No se ha podido validar!',
              response.data,
              'error'
            );
          }


        });
      });
    };



  });
