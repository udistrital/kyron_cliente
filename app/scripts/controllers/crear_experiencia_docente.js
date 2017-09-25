'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:CrearExperienciaDocenteCtrl
 * @description
 * # CrearExperienciaDocenteCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('CrearExperienciaDocenteCtrl', function (experienciaDocenteServices, $rootScope,  $scope,$timeout, uiGridConstants) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var self = this;
    self.id = $rootScope.id;
    self.vista_previa = false;
    self.tr_experiencia_docente = {};
    var datacursos = [];
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

      ]
    };
    self.gridOptions.multiSelect = false;
    var get_experiencia_docente = function () {
      experienciaDocenteServices.get('experiencia_docente', $.param({
        query:"PersonaId:" + self.id + ",Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptions.data = response.data;
        console.log(self.gridOptions.data);
      });
    };



    var get_cursos = function () {
      experienciaDocenteServices.get('cursos', $.param({
        query: "ExperienciaDocenteId.PersonaId:" + self.id + ",ExperienciaDocenteId.Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptionsCursos.data = response.data;
      });
    };

        var get_institucion = function () {
      experienciaDocenteServices.get('institucion', 'limit=0').then(function (response) {
        self.institucion = response.data;
      });
    };

          var get_tipo_dedicacion = function () {
      experienciaDocenteServices.get('tipo_dedicacion', 'limit=0').then(function (response) {
        self.tipo_dedicacion = response.data;
      });
    };

    get_experiencia_docente();
    get_cursos();
    get_institucion();
    get_tipo_dedicacion();

      self.gridOptions.onRegisterApi = function (gridApi) {
      self.gridApi = gridApi;
    };


    self.limpiar_seleccion = function () {
      self.vista_previa = !self.vista_previa;
      self.tr_experiencia_docente = {};
      datacursos = [];

    };

    self.gridOptionsCursos = {};
    self.gridOptionsCursos.enableFiltering = true;
    self.gridOptionsCursos.treeRowHeaderAlwaysVisible = false;
    self.gridOptionsCursos.columnDefs = [
      { field: 'ExperienciaDocenteId.InstitucionId.NombreInstitucion', displayName: 'Institucion', cellTemplate: '<div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null || ( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div>', width: 200 },
      // pre-populated search field
      { field: 'NombreCurso', displayName: 'Curso', width: 300 }
      // no filter input

    ];
    self.gridOptionsCursos.onRegisterApi = function (gridApi) {
      $timeout(function () {
        gridApi.grouping.clearGrouping();
        gridApi.grouping.groupColumn('ExperienciaDocenteId.InstitucionId.NombreInstitucion');
        gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
      });


    self.addCurso = function () {
             datacursos.push({
               "NombreCurso": $scope.Cursos,
            });
            $scope.Cursos=null;
    };

 self.guardar = function () {

  
var dataExperienciaDocente={
  "InstitucionId":{
      "Id":  self.experiencia_Docente.InstitucionId.Id
  },
  "TipoActividad": $scope.TipoActividad,
  "CampoEnseñanza":$scope.CampoEnsenanza,
  "PersonaId": self.id,
  "Validacion": false,
  "FechaInicio":$scope.FechaInicio,
  "FechaFinalizacion":$scope.FechaFinalizacion,
  "TipoDedicacionId": {
      "Id": self.experiencia_Docente.TipoDedicacionId.Id
  },
  
  "FechaDato": new Date(),
  "Vigente": true

};


        experienciaDocenteServices.post("tr_experiencia_docente", { ExperienciaDocente: dataExperienciaDocente, Cursos: datacursos })
        .then(function (response) {
          console.log(response);
          if (response.status === 201) {
            swal(
              'Buen trabajo!',
              'Añadió la experiencia con éxito',
              'success'
            );
            get_experiencia_docente();
            get_cursos();
            
            } else {
            swal(
              'Ha ocurrido un error',
              response.data,
              'error'
            );
          }
          self.limpiar_seleccion();

        });



     };

    };

  });
