'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:EditarProduccionAcademicaCtrl
 * @description
 * # EditarProduccionAcademicaCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('EditarProduccionAcademicaCtrl', function (produccionAcademicaServices, $rootScope, $scope,$timeout, uiGridConstants) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

        var self = this;
    self.id = $rootScope.id;
    self.vista_previa = false;
    self.tr_produccion_academica = {};
    self.gridOptions = {
      enableFiltering: true,
      enableSorting: true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      columnDefs: [
        {
          field: 'TituloProduccion', displayName: 'Titulo Producción', width: 200
        },
        {
          field: 'FechaProduccion', displayName: 'Fecha Producción', width: 200, cellFilter: 'date:"yyyy-MM-dd"'
        },
        {
          field: 'Pais', displayName: 'País', width: 100
        },
        {
          field: 'Ciudad', width: 100
        },
        {
          field: 'SubtipoProduccionId.Nombre', displayName: 'Subtipo Producción', width: 300
        },
        {
          field: 'Acciones',
          cellTemplate: '<button class="btn btn-danger btn-circle" ng-click="grid.appScope.editarProduccionAcademica.eliminar(row.entity)"><i class="glyphicon glyphicon-trash"></i></button>&nbsp;<button type="button" class="btn btn-success btn-circle" ng-click="grid.appScope.editarProduccionAcademica.editar(row.entity)"><i class="glyphicon glyphicon-pencil"></i></button>',
          width: 150
        }

      ]
    };
    self.gridOptions.multiSelect = false;
    var get_produccion_academica = function () {
      produccionAcademicaServices.get('produccion_academica', $.param({
        query: "PersonaId:" + self.id + ",Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptions.data = response.data;
        console.log(self.gridOptions.data);
      });
    };


    var get_tipo_produccion = function () {
      produccionAcademicaServices.get('tipo_produccion', 'limit=0').then(function (response) {
        self.tipo_produccion = response.data;
      });
    };

    var get_subtipo_produccion = function () {
      produccionAcademicaServices.get('subtipo_produccion', 'limit=0').then(function (response) {
        self.subtipo_produccion = response.data;
      });
    };

    var get_opcion_dato = function () {
      produccionAcademicaServices.get('opcion_dato', 'limit=0').then(function (response) {
        self.opcion_dato = response.data;
      });
    };

    var get_dato_produccion = function () {
      produccionAcademicaServices.get('dato_produccion', $.param({
        query: "ProduccionAcademicaId.PersonaId:" + self.id + ",ProduccionAcademicaId.Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptionsDatoSubtipo.data = response.data;
      });
    };

    var get_evaluador = function () {
      produccionAcademicaServices.get('evaluador', $.param({
        query: "ProduccionAcademicaId.PersonaId:" + self.id + ",ProduccionAcademicaId.Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptionsEvaluador.data = response.data;
      });
    };

    get_produccion_academica();
    get_tipo_produccion();
    get_subtipo_produccion();
    get_opcion_dato();
    get_dato_produccion();
    get_evaluador();


    self.gridOptions.onRegisterApi = function (gridApi) {
      self.gridApi = gridApi;
    };

    self.limpiar_seleccion = function () {
      self.vista_previa = !self.vista_previa;
   
    };



    self.editar = function(produccion){
      self.produccion_actual= produccion;
      if (self.produccion_actual !== null) {
        self.vista_previa = true;
      }
    };

    self.gridOptionsDatoSubtipo = {};
    self.gridOptionsDatoSubtipo.enableFiltering = true;
    self.gridOptionsDatoSubtipo.treeRowHeaderAlwaysVisible = false;
    self.gridOptionsDatoSubtipo.columnDefs = [
      { field: 'ProduccionAcademicaId.TituloProduccion', displayName: 'Titulo Producción', cellTemplate: '<div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null || ( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div>', width: 200 },
      // pre-populated search field
      { field: 'DatoSubtipoId.DatoId.Nombre', displayName: 'Dato', width: 300 },
      // no filter input
      { field: 'Valor', headerCellClass: $scope.highlightFilteredHeader,cellFilter: 'filtroDatoProduccion:this' , width: 300 }
    ];
    self.gridOptionsDatoSubtipo.onRegisterApi = function (gridApi) {
      $timeout(function () {
        gridApi.grouping.clearGrouping();
        gridApi.grouping.groupColumn('ProduccionAcademicaId.TituloProduccion');
        gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
      });
    };



    self.gridOptionsEvaluador = {};
    self.gridOptionsEvaluador.enableFiltering = true;
    self.gridOptionsEvaluador.treeRowHeaderAlwaysVisible = false;
    self.gridOptionsEvaluador.columnDefs = [
      { field: 'ProduccionAcademicaId.TituloProduccion', displayName: 'Titulo Producción', cellTemplate: '<div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null || ( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div>', width: 200 },
      // pre-populated search field
      { field: 'PersonaId', displayName: 'Evaluador', width: 300 }
    ];
    self.gridOptionsEvaluador.onRegisterApi = function (gridApi) {
      $timeout(function () {
        gridApi.grouping.clearGrouping();
        gridApi.grouping.groupColumn('ProduccionAcademicaId.TituloProduccion');
        gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
      });
    };

   self.guardar = function () {
      if(self.produccion_actual.Validacion === false){
      self.produccion_actual.FechaDato = new Date();
      produccionAcademicaServices.put('produccion_academica', self.produccion_actual.Id, self.produccion_actual)
        .then(function (response) {
          if (response.data === 'OK') {
            get_produccion_academica();
              get_dato_produccion();
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
      });}
      else{
            swal(
              'No se ha podido editar!',
                'La información ya ha sido validada',
                'error'
            );
          self.limpiar_seleccion();
      }

       get_produccion_academica();
    };


        self.eliminar = function (produccion) {

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
       produccion.FechaDato = new Date();
       produccion.Vigente = false;
       produccionAcademicaServices.put('produccion_academica', produccion.Id, produccion)
          .then(function (response) {

            if (response.data === 'OK') {
              self.gridOptions.data = [];
              self.gridOptionsDatoSubtipo.data = [];
              self.gridOptionsEvaluador.data = [];
              get_produccion_academica();
              get_dato_produccion();
              get_evaluador();
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
    };

    self.guardarEvaluador = function(){
    //  self.evaluador.ProduccionAcademicaId.Id = self.produccion_actual.Id;
      var datoEvaluador = {
        ProduccionAcademicaId : { Id : self.produccion_actual.Id},
        PersonaId : self.evaluador.PersonaId
      };


      produccionAcademicaServices.post("evaluador", datoEvaluador)
   .then(function (response) {
   console.log(response);
     if (response.status === 201) {
       swal(
         'Buen trabajo!',
         'Añadió la información con éxito',
         'success'
       );
       get_evaluador();
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
