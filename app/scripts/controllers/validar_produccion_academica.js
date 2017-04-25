'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:ValidarProduccionAcademicaCtrl
 * @description
 * # ValidarProduccionAcademicaCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('ValidarProduccionAcademicaCtrl', function (produccionAcademicaServices, $rootScope, $scope, $timeout, uiGridConstants) {
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
      enableRowSelection: false,
      enableRowHeaderSelection: false,
      rowHeight:30,
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
          name: 'Acción',
           width: 65,
          cellEditableCondition: false,
          cellTemplate: '  <div ng-if="row.entity.Validacion == false"> <button class="btn btn-success btn-sm" ng-click="grid.appScope.validarProduccionAcademica.validar(row.entity.Id, row.entity)"> <span class="glyphicon glyphicon-ok-sign"></span>Validar</button> </div>',
        },

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

    var get_dato_produccion = function () {
      produccionAcademicaServices.get('dato_produccion', $.param({
        query: "ProduccionAcademicaId.PersonaId:" + self.id + ",ProduccionAcademicaId.Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptionsDatoSubtipo.data = response.data;
      });
    };


    get_produccion_academica();

    get_dato_produccion();


    self.gridOptions.onRegisterApi = function (gridApi) {
      self.gridApi = gridApi;
    };




    self.gridOptionsDatoSubtipo = {};
    self.gridOptionsDatoSubtipo.enableFiltering = true;
    self.gridOptionsDatoSubtipo.treeRowHeaderAlwaysVisible = false;
    self.gridOptionsDatoSubtipo.columnDefs = [
      { field: 'ProduccionAcademicaId.TituloProduccion', displayName: 'Titulo Producción', cellTemplate: '<div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null || ( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div>', width: 200 },
      // pre-populated search field
      { field: 'DatoSubtipoId.DatoId.Nombre', displayName: 'Dato', width: 300 },
      // no filter input
      { field: 'Valor', headerCellClass: $scope.highlightFilteredHeader, cellFilter: 'filtroDatoProduccion:this', width: 300 }
    ];
    self.gridOptionsDatoSubtipo.onRegisterApi = function (gridApi) {
      $timeout(function () {
        gridApi.grouping.clearGrouping();
        gridApi.grouping.groupColumn('ProduccionAcademicaId.TituloProduccion');
        gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
      });
    };

    self.validar = function(id, produccion_academica){
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
        produccion_academica.Validacion = true;
    produccionAcademicaServices.put('produccion_academica', id, produccion_academica).then(function(response){
        if (response.data === 'OK') {
           
            swal(
              'Buen trabajo!',
              'Se validó correctamente!',
              'success'
            );
             get_produccion_academica();
            
          } else {
              swal(
                'No se ha podido validar!',
                response.data,
                'error'
              );
            }


    });
      });
  }
  });
