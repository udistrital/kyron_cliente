'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:EditarPersonaIdiomaCtrl
 * @description
 * # EditarPersonaIdiomaCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('EditarPersonaIdiomaCtrl', function (personaIdiomaServices, $rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var self = this;
    self.id = $rootScope.id;
    self.vista_previa = false;
    self.idioma_actual = null;
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

         {
        field: 'Acciones',
        cellTemplate: '<button class="btn btn-danger btn-circle" ng-click="grid.appScope.editarPersonaIdioma.eliminar(row.entity)"><i class="glyphicon glyphicon-trash"></i></button>',
        width: 150
      }
      ]
    };
    self.gridOptions.multiSelect = false;
    var get_persona_idioma = function () {
      personaIdiomaServices.get('persona_idioma', $.param({
        query: "PersonaId:" + self.id + ",Vigente:" + true,
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
      self.vista_previa = null;
    };

    self.limpiar_seleccion = function () {
      self.vista_previa = null;
    };


    self.guardar = function () {
      if(true){
      self.idioma_actual.FechaDato = new Date();
      personaIdiomaServices.put('persona_idioma', self.idioma_actual.Id, self.idioma_actual)
        .then(function (response) {
          if (response.data === 'OK') {
            get_persona_idioma();
            swal(
              'Buen trabajo!',
              'Se editó correctamente!',
              'success'
            );
            self.limpiar_seleccion();
          }
      });}
      else{
            swal(
              'No se ha podido editar!',
                'La información ya ha sido validada',
                'error'
            );
          self.limpiar_seleccion();
      }
    };
 self.eliminar = function (experiencia) {

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
      experiencia.FechaDato = new Date();
      experiencia.Vigente = false;
       personaIdiomaServices.put('persona_idioma', experiencia.Id, experiencia)
          .then(function (response) {

            if (response.data === 'OK') {
    get_persona_idioma();
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

    get_persona_idioma();
    };

  });
