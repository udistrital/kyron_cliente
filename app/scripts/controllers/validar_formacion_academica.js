'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:ValidarFormacionAcademicaCtrl
 * @description
 * # ValidarFormacionAcademicaCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('ValidarFormacionAcademicaCtrl', function (formacionAcademicaServices, $rootScope) {
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
      },
        {
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
        name: 'Acción',
        width: 70,
        cellEditableCondition: false,
        cellTemplate: '  <div ng-if="row.entity.Validacion == false"> <button class="btn btn-success btn-sm" ng-click="grid.appScope.validarFormacionAcademica.validar(row.entity.Id, row.entity)"> <span class="glyphicon glyphicon-ok-sign"></span>Validar</button> </div>',
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

    self.validar = function (id, formacion_academica) {
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
        formacion_academica.Validacion = true;
        formacionAcademicaServices.put('formacion_academica', id, formacion_academica).then(function (response) {
          if (response.data === 'OK') {

            swal(
              'Buen trabajo!',
              'Se validó correctamente!',
              'success'
            );
            get_formacion_academica();

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
