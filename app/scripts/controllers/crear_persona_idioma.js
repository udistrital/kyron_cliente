'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:CrearPersonaIdiomaCtrl
 * @description
 * # CrearPersonaIdiomaCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('CrearPersonaIdiomaCtrl', function (personaIdiomaServices,$rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    var self = this;
    self.id = $rootScope.id;
    self.vista_previa = false;
    self.persona_idioma = {};
    self.gridOptions = {
      enableFiltering: true,
      enableSorting: true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      columnDefs: [
      {
        field: 'Idioma.Nombre', displayName: 'Idioma', width: 200
      },
      {
        field: 'NivelIdioma.NombreNivel', displayName: 'Nivel', width: 300
      },
      ]
    };
    self.gridOptions.multiSelect = false;
    var get_persona_idioma = function () {
      personaIdiomaServices.get('persona_idioma', $.param({
        query:"PersonaId:" + self.id + ",Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptions.data = response.data;
        console.log(self.gridOptions.data);
      });
    };

    var get_idioma = function () {
      personaIdiomaServices.get('idioma', 'limit=0').then(function (response) {
        self.idioma = response.data;
      });
    };

    var get_nivel_idioma = function () {
      personaIdiomaServices.get('nivel_idioma', 'limit=0').then(function (response) {
        self.nivel_idioma = response.data;
      });
    };
    get_persona_idioma();
    get_idioma();
    get_nivel_idioma();

    self.gridOptions.onRegisterApi = function (gridApi) {
      self.gridApi = gridApi;
    };

    self.limpiar_seleccion = function () {
      self.vista_previa = !self.vista_previa;
      self.persona_idioma = {};
    };

    self.guardar = function () {
      self.persona_idioma.FechaDato = new Date();
      self.persona_idioma.Validacion = false;
      self.persona_idioma.Vigente = true;
      self.persona_idioma.PersonaId = self.id;
      personaIdiomaServices.post('persona_idioma', self.persona_idioma)
        .then(function (response) {
          console.log(response);
          if (response.status === 201) {
            swal(
              'Buen trabajo!',
              'Añadió la idioma con éxito',
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
          get_persona_idioma();
        });
    };

  });
