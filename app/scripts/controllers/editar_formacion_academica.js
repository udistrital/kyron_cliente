'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:EditarFormacionAcademicaCtrl
 * @description
 * # EditarFormacionAcademicaCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('EditarFormacionAcademicaCtrl', function (formacionAcademicaServices, $rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];



    var self = this;
    self.id = $rootScope.id;
    self.vista_previa = false;
    self.formacion_actual = null;
    self.gridOptions = {
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
      {
        field: 'Acciones',
        cellTemplate: '<button class="btn btn-danger btn-circle" ng-click="grid.appScope.editarFormacionAcademica.eliminar(row.entity)"><i class="glyphicon glyphicon-trash"></i></button>&nbsp;<button type="button" class="btn btn-success btn-circle" ng-click="grid.appScope.editarFormacionAcademica.editar(row.entity)"><i class="glyphicon glyphicon-pencil"></i></button>',
        width: 150
      }
      ]
    };
    self.gridOptions.multiSelect = false;
    var get_formacion_academica = function () {
      formacionAcademicaServices.get('formacion_academica', $.param({
        query: "PersonaId:" + self.id + ",Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptions.data = response.data;
        console.log(self.gridOptions.data);
      });
    };


    var get_institucion = function () {
      formacionAcademicaServices.get('institucion', 'limit=0').then(function (response) {
        self.institucion = response.data;
      });
    };

    var get_programa = function () {
      formacionAcademicaServices.get('programa', 'limit=0').then(function (response) {
        self.programa = response.data;
      });
    };

    var get_titulo = function () {
      formacionAcademicaServices.get('titulo', 'limit=0').then(function (response) {
        self.titulo = response.data;
      });
    };
    get_formacion_academica();
    get_institucion();
    get_programa();
    get_titulo();


    self.gridOptions.onRegisterApi = function (gridApi) {
      self.gridApi = gridApi;
    };


    self.limpiar_seleccion = function () {
      self.vista_previa = null;
    };

    self.editar = function(formacion){
      self.formacion_actual= formacion;
      if (self.formacion_actual !== null) {
        self.vista_previa = true;
      }
    };

    self.guardar = function () {
      if(self.formacion_actual.Validacion === false){
      self.formacion_actual.FechaDato = new Date();
      formacionAcademicaServices.put('formacion_academica', self.formacion_actual.Id, self.formacion_actual)
        .then(function (response) {
          if (response.data === 'OK') {
            get_formacion_academica();
            swal(
              'Buen trabajo!',
              'Se editó correctamente!',
              'success'
            );
            self.limpiar_seleccion();
          }
      });}
      else{
            swal(
              'No se ha podido editar!',
                'La información ya ha sido validada',
                'error'
            );
          self.limpiar_seleccion();
      }
    };
    self.eliminar = function (formacion) {

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
       formacion.FechaDato = new Date();
       formacion.Vigente = false;
       formacionAcademicaServices.put('formacion_academica', formacion.Id, formacion)
          .then(function (response) {

            if (response.data === 'OK') {
              self.gridOptions.data = [];
              get_formacion_academica();
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
    };

  });
