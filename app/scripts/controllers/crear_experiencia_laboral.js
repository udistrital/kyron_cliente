'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:CrearExperienciaLaboralCtrl
 * @description
 * # CrearExperienciaLaboralCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('CrearExperienciaLaboralCtrl', function (experienciaLaboralServices, $rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var self = this;
    self.id = $rootScope.id;
    self.vista_previa = false;
    self.experiencia_laboral = {};
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
    };

    self.limpiar_seleccion = function () {
      self.vista_previa = !self.vista_previa;
      self.experiencia_laboral = {};
    };

    self.guardar = function () {
      self.experiencia_laboral.PersonaId = self.id;
      self.experiencia_laboral.FechaDato = new Date();
      self.experiencia_laboral.Validacion = false;
      self.experiencia_laboral.Vigente = true;
      if(self.experiencia_laboral.FechaInicio < self.experiencia_laboral.FechaFinalizacion){
      experienciaLaboralServices.post('experiencia_laboral', self.experiencia_laboral)
        .then(function (response) {
          console.log(response);
          if (response.status === 201) {
            swal(
              'Buen trabajo!',
              'Añadió la información con éxito',
              'success'
            );
            get_experiencia_laboral();
          } else {
            swal(
              'Ha ocurrido un error',
              response.data,
              'error'
            );
          }
          self.limpiar_seleccion();

        });
      }else{
        swal(
          'Ha ocurrido un error',
          'La fecha de inicio debe ser menor a la fecha de finalización',
          'error'
        );
      }
    };

  });
