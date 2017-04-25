'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:EditarDistincionCtrl
 * @description
 * # EditarDistincionCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('EditarDistincionCtrl', function (distincionServices, $rootScope, $scope) {
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
      gridApi.selection.on.rowSelectionChanged($scope, function (row) {
        self.distincion_actual = row.entity;
        if (self.distincion_actual !== null) {
          self.vista_previa = true;
        }
      });
    };

    self.limpiar_seleccion = function () {
      self.vista_previa = null;
    };


    self.guardar = function () {
      if(self.distincion_actual.Validacion == false){
      self.distincion_actual.FechaDato = new Date();
      distincionServices.put('distincion', self.distincion_actual.Id, self.distincion_actual)
        .then(function (response) {
          if (response.data === 'OK') {
           
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

       get_distincion();
    };
    self.eliminar = function () {

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
       self.distincion_actual.FechaDato = new Date();
       self.distincion_actual.Vigente = false; 
       distincionServices.put('distincion', self.distincion_actual.Id, self.distincion_actual)
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
    };

  });


