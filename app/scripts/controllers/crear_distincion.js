'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:CrearDistincionCtrl
 * @description
 * # CrearDistincionCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('CrearDistincionCtrl', function (distincionServices, $rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
 var self = this;
    self.id = $rootScope.id;
    self.vista_previa = false;
    self.distincion = {};
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
    };

    self.limpiar_seleccion = function () {
      self.vista_previa = !self.vista_previa;
      self.distincion = {};
    };

    self.guardar = function () {
      self.distincion.PersonaId = self.id;
      self.distincion.FechaDato = new Date();
      self.distincion.Validacion = false;
      self.distincion.Vigente = true;
      distincionServices.post('distincion', self.distincion)
        .then(function (response) {
          console.log(response);
          if (response.status === 201) {
            swal(
              'Buen trabajo!',
              'Añadió la formación con éxito',
              'success'
            );
            get_distincion();
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

  });
