'use strict';

/**
 * @ngdoc function
 * @name kyronApp.controller:CrearFormacionAcademicaCtrl
 * @description
 * # CrearFormacionAcademicaCtrl
 * Controller of the kyronApp
 */
angular.module('kyronApp')
  .controller('CrearFormacionAcademicaCtrl', function (formacionAcademicaServices, $rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    var self = this;
    self.id = $rootScope.id;
    self.vista_previa = false;
    self.formacion_academica = {};
    self.gridOptions = {
      enableFiltering: true,
      enableSorting: true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      columnDefs: [{
        field: 'InstitucionId.NombreInstitucion', displayName: 'Institución', width: 400
      },
      {
        field: 'ProgramaId.NombrePrograma', displayName: 'Programa', width: 200
      },
      {
        field: 'FechaInicio', displayName: 'Fecha Inicio', cellFilter: 'date:"yyyy-MM-dd"', width: 100
      },
      {
        field: 'FechaFinalizacion', displayName: 'Fecha Finalización', cellFilter: 'date:"yyyy-MM-dd"', width: 100
      },
      {
        field: 'Titulo.Nombre', displayName: 'Título', width: 300
      },
      {
        field: 'NombreProyecto', displayName: 'Nombre Proyecto', width: 500
      },
      {
        field: 'AreaConocimiento', displayName: 'Área de Conocimiento', width: 200
      },
      ]
    };
    self.gridOptions.multiSelect = false;
    var get_formacion_academica = function () {
      formacionAcademicaServices.get('formacion_academica', $.param({
        query: "PersonaId:" + self.id + ",Vigente:" + true,
        limit: 0
      })).then(function (response) {
        self.gridOptions.data = response.data;
        console.log(self.gridOptions.data);
      });
    };

    var get_institucion = function () {
      formacionAcademicaServices.get('institucion', 'limit=0').then(function (response) {
        self.institucion = response.data;
      });
    };

  /*  var get_programa = function () {
      formacionAcademicaServices.get('programa', 'limit=0').then(function (response) {
        self.programa = response.data;
      });
    };*/

  /*  var get_titulo = function () {
      formacionAcademicaServices.get('titulo', 'limit=0').then(function (response) {
        self.titulo = response.data;
      });
    }; */
    get_formacion_academica();
    get_institucion();
  //  get_programa();
  //  get_titulo();

    self.gridOptions.onRegisterApi = function (gridApi) {
      self.gridApi = gridApi;
    };

    self.limpiar_seleccion = function () {
      self.vista_previa = !self.vista_previa;
      self.formacion_academica = {};
    };


    self.obtenerprogramas = function (idinstitucion) {
      self.paramPrograma = $.param({
        query: "InstitucionId.Id:" + idinstitucion
      });

      formacionAcademicaServices.get("programa", self.paramPrograma).then(function (response) {
        self.programa = response.data;
      });

    };

    self.obtenertitulos = function (idprograma) {
      self.paramTitulo = $.param({
        query: "Programa.Id:" + idprograma
      });

      formacionAcademicaServices.get("titulo", self.paramTitulo).then(function (response) {
        self.titulo= response.data;
      });

    };
    self.guardar = function () {

      self.formacion_academica.PersonaId = self.id;
      self.formacion_academica.FechaDato = new Date();
      self.formacion_academica.Validacion = false;
      self.formacion_academica.Vigente = true;
      if(self.formacion_academica.FechaInicio < self.formacion_academica.FechaFinalizacion){
      formacionAcademicaServices.post('formacion_academica', self.formacion_academica)
        .then(function (response) {
          console.log(response);
          if (response.status === 201) {
            swal(
              'Buen trabajo!',
              'Añadió la información con éxito',
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
          get_formacion_academica();
        });
      }
      else {
        swal(
          'Ha ocurrido un error',
          'La fecha de inicio debe ser menor a la fecha de finalización',
          'error'
        );
      }

    };

  });
