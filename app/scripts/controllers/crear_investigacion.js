'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:CrearInvestigacionCtrl
 * @description
 * # CrearInvestigacionCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('CrearInvestigacionCtrl', function (investigacionServices, $rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  $rootScope.id = 123;

    var self = this;
    self.id = $rootScope.id;
    self.vista_previa = false;
    self.investigacion = {};
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
    };

    self.limpiar_seleccion = function () {
      self.vista_previa = !self.vista_previa;
      self.investigacion = {};
    };

    self.guardar = function () {
      self.investigacion.PersonaId = self.id;
      self.investigacion.FechaDato = new Date();
      self.investigacion.Vigente = true;
      investigacionServices.post('investigacion', self.investigacion)
        .then(function (response) {
          console.log(response);
          if (response.status === 201) {
            swal(
              'Buen trabajo!',
              'Añadió la formación con éxito',
              'success'
            );

          } else {
            swal(
              'Ha ocurrido un error',
              response.data,
              'error'
            );
          }
          self.limpiar_seleccion();
          get_investigacion();
        });
    };

  });
