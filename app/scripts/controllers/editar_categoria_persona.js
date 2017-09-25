'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:EditarCategoriaPersonaCtrl
 * @description
 * # EditarCategoriaPersonaCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('EditarCategoriaPersonaCtrl', function (categoriaServices, $rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


        var self = this;
        self.id = $rootScope.id;
        self.vista_previa = false;
        self.categoria_actual = {};
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
          {
            field: 'Acciones',
            cellTemplate: '<button class="btn btn-danger btn-circle" ng-click="grid.appScope.editarCategoriaPersona.eliminar(row.entity)"><i class="glyphicon glyphicon-trash"></i></button>&nbsp;<button type="button" class="btn btn-success btn-circle" ng-click="grid.appScope.editarCategoriaPersona.editar(row.entity)"><i class="glyphicon glyphicon-pencil"></i></button>',
            width: 150
          }
          ]
        };
        self.gridOptions.multiSelect = false;
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
          self.vista_previa = null;
          get_categoria_persona();
        };

        self.editar = function(categoria){
          self.categoria_actual= categoria;
          if (self.categoria_persona !== null) {
            self.vista_previa = true;
          }
        };



    self.guardar = function () {
      if(self.categoria_actual.Validacion === false){
      self.categoria_actual.FechaDato = new Date();
      categoriaServices.put('categoria_persona', self.categoria_actual.Id, self.categoria_actual)
        .then(function (response) {
          if (response.data === 'OK') {
                get_categoria_persona();
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
      });

    }
      else{
            swal(
              'No se ha podido editar!',
              'La información ya ha sido validada',
              'error'
            );
          self.limpiar_seleccion();
      }


    };


    self.eliminar = function (categoria) {

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
       categoria.FechaDato = new Date();
       categoria.Vigente = false;
       categoriaServices.put('categoria_persona',categoria.Id, categoria)
          .then(function (response) {

            if (response.data === 'OK') {
              self.gridOptions.data= [];
                 get_categoria_persona();
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
