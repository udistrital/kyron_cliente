'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:ConsultarCategoriaPersonaCtrl
 * @description
 * # ConsultarCategoriaPersonaCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('ConsultarCategoriaPersonaCtrl', function (categoriaServices, $rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    var self = this;
    self.id = $rootScope.id;
    self.vista_previa = false;
    self.categoria_persona = {};
    self.tipo_categoria = {};
    self.gridOptions = {
      enableFiltering: true,
      enableSorting: true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      columnDefs: [{
        field: 'PersonaId', displayName: 'Persona', width: 300
      },{
        field: 'IdTipoCategoria.NombreCategoria', displayName: 'Categoria', width: 400
      },
      {
        field: 'FechaDato', displayName: 'Fecha', cellFilter: 'date:"yyyy-MM-dd"', width: 100
      },
      ]
    };


    var get_categoria_persona = function () {
      categoriaServices.get('categoria_persona', $.param({
        query: "Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptions.data = response.data;
        console.log(self.gridOptions.data);
      });
    };



    get_categoria_persona();

    self.gridOptions.onRegisterApi = function (gridApi) {
      self.gridApi = gridApi;
    };
  });
