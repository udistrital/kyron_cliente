'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:CrearCategoriaPersonaCtrl
 * @description
 * # CrearCategoriaPersonaCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('CrearCategoriaPersonaCtrl', function (categoriaServices, $rootScope) {
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
        field: 'IdTipoCategoria.NombreCategoria', displayName: 'Categoria', width: 400
      },
      {
        field: 'FechaDato', displayName: 'Fecha', cellFilter: 'date:"yyyy-MM-dd"', width: 100
      },
      ]
    };


    var get_categoria_persona = function () {
      categoriaServices.get('categoria_persona', $.param({
        query: "PersonaId:" + self.id + ",Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptions.data = response.data;
        console.log(self.gridOptions.data);
      });
    };

    var get_tipo_categoria = function () {
      categoriaServices.get('tipo_categoria', 'limit=0').then(function (response) {
        self.tipo_categoria = response.data;
      });
    };

    get_categoria_persona();
    get_tipo_categoria();

    self.gridOptions.onRegisterApi = function (gridApi) {
      self.gridApi = gridApi;
    };

    self.limpiar_seleccion = function () {
      self.vista_previa = !self.vista_previa;
      self.categoria_persona = {};
    };

    self.guardar = function () {
      if(self.gridOptions.data===null){
        self.categoria_persona.PersonaId = self.id;
        self.categoria_persona.FechaDato = new Date();
        self.categoria_persona.Validacion = false;
        self.categoria_persona.Vigente = true;
        categoriaServices.post('categoria_persona', self.categoria_persona)
        .then(function (response) {
          console.log(response);
          if (response.status === 201) {
            swal(
              'Buen trabajo!',
              'Añadió la información con éxito',
              'success'
            );
            get_categoria_persona();
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
          'La persona '+ self.id +' Tiene una categoria asignada, debe eliminarla antes de agregar una nueva',
          'error'
        );
        self.limpiar_seleccion();
      }
    };

  });
