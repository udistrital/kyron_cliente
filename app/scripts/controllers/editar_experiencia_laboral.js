'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:EditarExperienciaLaboralCtrl
 * @description
 * # EditarExperienciaLaboralCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('EditarExperienciaLaboralCtrl', function (experienciaLaboralServices, $rootScope, $scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    var self = this;
    self.id = $rootScope.id;
    self.vista_previa = false;
    self.experiencia_actual = {};
    self.gridOptions = {
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
    self.gridOptions.multiSelect = false;
    var get_experiencia_laboral = function () {
      experienciaLaboralServices.get('experiencia_laboral', $.param({
        query: "PersonaId:" + self.id + ",Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptions.data = response.data;
        console.log(self.gridOptions.data);
      });
    };

    var get_institucion = function () {
      experienciaLaboralServices.get('institucion', 'limit=0').then(function (response) {
        self.institucion = response.data;
      });
    };


    get_experiencia_laboral();
    get_institucion();

        self.gridOptions.onRegisterApi = function (gridApi) {
      self.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope, function (row) {
        self.experiencia_actual = row.entity;
        if (self.experiencia_actual !== null) {
          self.vista_previa = true;
        }
      });
    };

    self.limpiar_seleccion = function () {
      self.vista_previa = null;
    };


    self.guardar = function () {
      if(self.experiencia_actual.Validacion == false){
      self.experiencia_actual.FechaDato = new Date();
      experienciaLaboralServices.put('experiencia_laboral', self.experiencia_actual.Id, self.experiencia_actual)
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

       get_experiencia_laboral();
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
       self.experiencia_actual.FechaDato = new Date();
       self.experiencia_actual.Vigente = false; 
       experienciaLaboralServices.put('experiencia_laboral', self.experiencia_actual.Id, self.experiencia_actual)
          .then(function (response) {

            if (response.data === 'OK') {
              get_experiencia_laboral();
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


