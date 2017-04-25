'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:EditarInvestigacionCtrl
 * @description
 * # EditarInvestigacionCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('EditarInvestigacionCtrl', function (investigacionServices, $rootScope, $scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
 var self = this;
    self.id = $rootScope.id;
    self.vista_previa = false;
    self.investigacion_actual = null;
    self.gridOptions = {
      enableFiltering: true,
      enableSorting: true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      columnDefs: [{
        field: 'InstitucionId.NombreInstitucion', displayName: 'Institución', width: 400
      },
      {
        field: 'TipoInvestigacionId.NombreTipoInvestigacion', displayName: 'Tipo Investigación', width: 200
      },
      {
        field: 'FechaInicio', displayName: 'Fecha Inicio', cellFilter: 'date:"yyyy-MM-dd"', width: 100
      },
      {
        field: 'FechaFinalizacion', displayName: 'Fecha Finalización', cellFilter: 'date:"yyyy-MM-dd"', width: 100
      },
      {
        field: 'TipoInvestigacion', displayName: 'Tipo Investigacion', width: 300
      },
      {
        field: 'NombreInvestigacion', displayName: 'Nombre Investigacion', width: 500
      },
      ]
    };
    self.gridOptions.multiSelect = false;
    var get_investigacion = function () {
      investigacionServices.get('investigacion', $.param({
        query: "PersonaId:" + self.id + ",Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptions.data = response.data;
        console.log(self.gridOptions.data);
      });
    };

    var get_institucion = function () {
      investigacionServices.get('institucion', 'limit=0').then(function (response) {
        self.institucion = response.data;
      });
    };

    var  get_tipo_investigacion = function () {
      investigacionServices.get('tipo_investigacion', 'limit=0').then(function (response) {
        self.tipo_investigacion = response.data;
      });
    };


    get_investigacion();
    get_institucion();
    get_tipo_investigacion();


    self.gridOptions.onRegisterApi = function (gridApi) {
      self.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope, function (row) {
        self.investigacion_actual = row.entity;
        if (self.investigacion_actual !== null) {
          self.vista_previa = true;
        }
      });
    };

    self.limpiar_seleccion = function () {
      self.vista_previa = null;
    };


    self.guardar = function () {
      self.investigacion_actual.FechaDato = new Date();
      investigacionServices.put('investigacion', self.investigacion_actual.Id, self.investigacion_actual)
        .then(function (response) {
          if (response.data === 'OK') {
            get_investigacion();
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
       self.investigacion_actual.FechaDato = new Date();
       self.investigacion_actual.Vigente = false; 
       investigacionServices.put('investigacion', self.investigacion_actual.Id, self.investigacion_actual)
          .then(function (response) {

            if (response.data === 'OK') {
              get_investigacion();
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
