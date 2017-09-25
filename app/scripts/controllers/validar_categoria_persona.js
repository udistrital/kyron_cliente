'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:ValidarCategoriaPersonaCtrl
 * @description
 * # ValidarCategoriaPersonaCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('ValidarCategoriaPersonaCtrl', function (categoriaServices, $rootScope) {
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
      {
        name: 'Acción',
        width: 70,
        cellEditableCondition: false,
        cellTemplate: '  <div ng-if="row.entity.Validacion === false"> <button class="btn btn-success btn-sm" ng-click="grid.appScope.validarCategoriaPersona.validar(row.entity.Id, row.entity)"> <span class="glyphicon glyphicon-ok-sign"></span>Validar</button> </div>',
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


    self.validar = function (id, categoria_persona) {
      swal({
        title: 'Está seguro?',
        text: "No podrá revertir esto!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Validar'
      }).then(function () {
        categoria_persona.Validacion = true;
        categoriaServices.put('categoria_persona', id, categoria_persona).then(function (response) {
          if (response.data === 'OK') {

            swal(
              'Buen trabajo!',
              'Se validó correctamente!',
              'success'
            );
            get_categoria_persona();

          } else {
            swal(
              'No se ha podido validar!',
              response.data,
              'error'
            );
          }


        });
      });
    };

  });
