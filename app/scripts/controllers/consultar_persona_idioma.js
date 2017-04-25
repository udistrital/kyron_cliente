'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:ConsultarPersonaIdiomaCtrl
 * @description
 * # ConsultarPersonaIdiomaCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('ConsultarPersonaIdiomaCtrl', function (personaIdiomaServices, $rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $rootScope.id = 123;

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
        field: 'IdiomaId.Nombre', displayName: 'Idioma', width: 200
      },
      {
        field: 'NivelIdioma.NombreNivel', displayName: 'NivelIdioma', width: 300
      },
      ]
    };
    self.gridOptions.multiSelect = false;
    var get_persona_idioma = function () {
      personaIdiomaServices.get('persona_idioma', $.param({
        query: "Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptions.data = response.data;
        console.log(self.gridOptions.data);
      });
    };


    get_persona_idioma();


    self.gridOptions.onRegisterApi = function (gridApi) {
      self.gridApi = gridApi;
    };

  });
  