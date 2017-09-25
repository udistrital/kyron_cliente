'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:ValidarExperienciaLaboralCtrl
 * @description
 * # ValidarExperienciaLaboralCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('ValidarExperienciaLaboralCtrl', function (experienciaLaboralServices, $rootScope) {
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
      },
      {
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
      {
        name: 'Acción',
        width: 70,
        cellEditableCondition: false,
        cellTemplate: '  <div ng-if="row.entity.Validacion == false"> <button class="btn btn-success btn-sm" ng-click="grid.appScope.validarExperienciaLaboral.validar(row.entity.Id, row.entity)"> <span class="glyphicon glyphicon-ok-sign"></span>Validar</button> </div>',
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


    self.validar = function (id, experiencia_laboral) {
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
        experiencia_laboral.Validacion = true;
        experienciaLaboralServices.put('experiencia_laboral', id, experiencia_laboral).then(function (response) {
          if (response.data === 'OK') {

            swal(
              'Buen trabajo!',
              'Se validó correctamente!',
              'success'
            );
            get_experiencia_laboral();

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
