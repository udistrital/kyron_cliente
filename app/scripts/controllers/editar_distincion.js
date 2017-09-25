'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:EditarDistincionCtrl
 * @description
 * # EditarDistincionCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('EditarDistincionCtrl', function (distincionServices, $rootScope,$scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var self = this;
    self.id = $rootScope.id;
    self.vista_previa = false;
    self.distincion_actual = {};
    self.gridOptions = {
      enableFiltering: true,
      enableSorting: true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      columnDefs: [{
        field: 'InstitucionId.NombreInstitucion', displayName: 'Institución', width: 400
      },
      {
        field: 'Nombre', displayName: 'Nombre', width: 200
      },
      {
        field: 'Fecha', displayName: 'Fecha', cellFilter: 'date:"yyyy-MM-dd"', width: 100
      },
      {
        field: 'Acciones',
        cellTemplate: '<button class="btn btn-danger btn-circle" ng-click="grid.appScope.editarDistincion.eliminar(row.entity)"><i class="glyphicon glyphicon-trash"></i></button>',
        width: 150
      }

      ]
    };
    self.gridOptions.multiSelect = false;
    var get_distincion = function () {
      distincionServices.get('distincion', $.param({
        query: "PersonaId:" + self.id + ",Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptions.data = response.data;
        console.log(self.gridOptions.data);
      });
    };

    var get_institucion = function () {
      distincionServices.get('institucion', 'limit=0').then(function (response) {
        self.institucion = response.data;
      });
    };


    get_distincion();
    get_institucion();

        self.gridOptions.onRegisterApi = function (gridApi) {
      self.gridApi = gridApi;
    };

    self.limpiar_seleccion = function () {
      self.vista_previa = null;
    };

    self.editar = function(experiencia){
      self.distincion_actual= experiencia;
      if (self.distincion_actual !== null) {
        self.vista_previa = true;
      }
      $scope.Date=self.distincion_actual.FechaDato;
    };


    self.guardar = function () {
      self.distincion_actual.FechaDato = new Date();
      distincionServices.put('distincion', self.distincion_actual.Id, self.distincion_actual)
        .then(function (response) {
          if (response.data === 'OK') {
            get_distincion();
            swal(
              'Buen trabajo!',
              'Se editó correctamente!',
              'success'
            );
            self.limpiar_seleccion();
          }
      });
            self.limpiar_seleccion();

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
       distincionServices.put('distincion', experiencia.Id, experiencia)
          .then(function (response) {

            if (response.data === 'OK') {
    get_distincion();
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

    get_distincion();
    };

  });
