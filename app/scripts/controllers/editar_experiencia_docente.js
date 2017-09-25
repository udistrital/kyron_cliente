'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:EditarExperienciaDocenteCtrl
 * @description
 * # EditarExperienciaDocenteCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('EditarExperienciaDocenteCtrl', function (experienciaDocenteServices,$rootScope, $scope,$timeout, uiGridConstants) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
 var self = this;
    self.id = $rootScope.id;
    self.vista_previa = false;
    self.experiencia_actual = null;
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
        field: 'Acciones',
        cellTemplate: '<button class="btn btn-danger btn-circle" ng-click="grid.appScope.editarExperienciaDocente.eliminar(row.entity)"><i class="glyphicon glyphicon-trash"></i></button>&nbsp;',
        width: 150
      }

      ]
    };
    self.gridOptions.multiSelect = false;
    var get_experiencia_docente = function () {
      experienciaDocenteServices.get('experiencia_docente', $.param({
        query: "PersonaId:" + self.id + ",Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptions.data = response.data;
        console.log(self.gridOptions.data);
      });
    };

    self.limpiar_seleccion = function () {
      
      self.tr_experiencia_docente = {};
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
    };

    self.editar = function(experiencia){
      self.experiencia_actual= experiencia;
      if (self.experiencia_actual !== null) {
        self.vista_previa = true;
      }
      
    };

self.guardar = function () {
      if(self.experiencia_actual.Validacion === false){
      self.experiencia_actual.FechaDato = new Date();
      experienciaDocenteServices.put('experiencia_laboral', self.experiencia_actual.Id, self.experiencia_actual)
        .then(function (response) {
          if (response.data === 'OK') {
            get_experiencia_docente();
            swal(
              'Buen trabajo!',
              'Se editó correctamente!',
              'success'
            );

          } else {
              swal(
                'No se ha podido editar!',
                response.data,
                'error'
              );
            }
            self.limpiar_seleccion();
      });}
      else{
            swal(
              'No se ha podido editar!',
                'La información ya ha sido validada',
                'error'
            );
          self.limpiar_seleccion();
      }

       get_experiencia_docente();
    };


    self.eliminar = function (experiencia) {

      swal({
        title: 'Está seguro?',
        text: "No podrá revertir esto!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar'
      }).then(function () {
      experiencia.FechaDato = new Date();
      experiencia.Vigente = false;
       experienciaDocenteServices.put('experiencia_docente', experiencia.Id, experiencia)
          .then(function (response) {

            if (response.data === 'OK') {
              get_experiencia_docente();
              self.limpiar_seleccion();
              swal(
                'Eliminado!',
                'El registro ha sido eliminado.',
                'success'
              );
            } else {
              swal(
                'No ha podido ser eliminado!',
                response.data,
                'error'
              );
            }
          });

      }).catch(swal.noop);

  get_experiencia_docente();
    };



  });
