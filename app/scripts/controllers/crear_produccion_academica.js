'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:CrearProduccionAcademicaCtrl
 * @description
 * # CrearProduccionAcademicaCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('CrearProduccionAcademicaCtrl', function (produccionAcademicaServices, $rootScope, $scope,$timeout, uiGridConstants) {
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


    get_produccion_academica();
    get_tipo_produccion();
    get_subtipo_produccion();
    get_opcion_dato();
    get_dato_produccion();


    self.gridOptions.onRegisterApi = function (gridApi) {
      self.gridApi = gridApi;
    };

    self.limpiar_seleccion = function () {
      self.vista_previa = !self.vista_previa;
      self.tr_produccion_academica = {};
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




    self.getDatoSubtipo = function (idSubtipo) {
      self.paramSubtipoProduccion = $.param({
        query: "SubtipoProduccion:" + idSubtipo
      });
      produccionAcademicaServices.get("dato_subtipo", self.paramSubtipoProduccion).then(function (response) {
        $scope.infoDatoSubtipo = response.data;

        $scope.infoInput = [];
        $scope.infoSelect = [];
        for (var i = 0; i < $scope.infoDatoSubtipo.length; i++) {
          $scope.infoDatoSubtipo[i].Dominio = JSON.parse($scope.infoDatoSubtipo[i].Dominio);
          switch ($scope.infoDatoSubtipo[i].Dominio.Entrada) {
            case "input":
              $scope.infoInput.push($scope.infoDatoSubtipo[i]);
              break;
            case "select":
              $scope.infoSelect.push($scope.infoDatoSubtipo[i]);
              break;

          }

        }
      });

    };



    self.guardar = function () {
      var dataProduccionAcademica = {
             "Ciudad": $scope.ciudad,
             "NumeroAutores": $scope.numeroAutores,
             "Pais": $scope.pais,
             "PersonaId": self.id,
             "SubtipoProduccionId": {
               "Id": $scope.subtipoProduccion
             },
             "TituloProduccion": $scope.tituloProduccion,
             "FechaProduccion": $scope.fechaProduccion,
             "Validacion": false,
             "FechaDato" : new Date(),
             "Vigente" : true
           }


           var dataDatoProduccion = [];

           for (var i = 0; i < $scope.infoInput.length; i++) {


             dataDatoProduccion.push({
               "DatoSubtipoId": { "Id": $scope.infoInput[i].Id },
               "Valor": $scope.infoInput[i].Dominio.Valor.toString()
             });
           }

           for (var j = 0; j < $scope.infoSelect.length; j++) {

             dataDatoProduccion.push({
               "DatoSubtipoId": { "Id": $scope.infoSelect[j].Id },
               "Valor": $scope.infoSelect[j].Dominio.Valor.toString()
             });
           }

           produccionAcademicaServices.post("tr_produccion_academica", { ProduccionAcademica: dataProduccionAcademica, DatoProduccion: dataDatoProduccion })
        .then(function (response) {
        console.log(response);
          if (response.status === 201) {
            swal(
              'Buen trabajo!',
              'Añadió la formación con éxito',
              'success'
            );
            get_produccion_academica();
            get_dato_produccion();
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
