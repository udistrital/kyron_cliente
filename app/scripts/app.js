'use strict';

/**
 * @ngdoc overview
 * @name kyronApp
 * @description
 * # kyronApp
 *
 * Main module of the application.
 */
angular
  .module('kyronApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'afOAuth2',
    'treeControl',
    'ngMaterial',
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.cellNav',
    'ui.grid.treeView',
    'ui.grid.selection',
    'ui.grid.exporter',
    'ui.grid.grouping',
    'ngStorage',
    'ngWebSocket',
    'angularMoment',
    'ui.utils.masks',
    'pascalprecht.translate'
  ])
  .run(function (amMoment) {
    amMoment.changeLocale('es');
  })
  .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/notificaciones', {
        templateUrl: 'views/notificaciones.html',
        controller: 'NotificacionesCtrl',
        controllerAs: 'notificaciones'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/crear_formacion_academica', {
        templateUrl: 'views/crear_formacion_academica.html',
        controller: 'CrearFormacionAcademicaCtrl',
        controllerAs: 'crearFormacionAcademica'
      })
      .when('/editar_formacion_academica', {
        templateUrl: 'views/editar_formacion_academica.html',
        controller: 'EditarFormacionAcademicaCtrl',
        controllerAs: 'editarFormacionAcademica'
      })
      .when('/consultar_formacion_academica', {
        templateUrl: 'views/consultar_formacion_academica.html',
        controller: 'ConsultarFormacionAcademicaCtrl',
        controllerAs: 'consultarFormacionAcademica'
      })
      .when('/crear_experiencia_laboral', {
        templateUrl: 'views/crear_experiencia_laboral.html',
        controller: 'CrearExperienciaLaboralCtrl',
        controllerAs: 'crearExperienciaLaboral'
      })
      .when('/editar_experiencia_laboral', {
        templateUrl: 'views/editar_experiencia_laboral.html',
        controller: 'EditarExperienciaLaboralCtrl',
        controllerAs: 'editarExperienciaLaboral'
      })
      .when('/consultar_experiencia_laboral', {
        templateUrl: 'views/consultar_experiencia_laboral.html',
        controller: 'ConsultarExperienciaLaboralCtrl',
        controllerAs: 'consultarExperienciaLaboral'
      })
      .when('/crear_produccion_academica', {
        templateUrl: 'views/crear_produccion_academica.html',
        controller: 'CrearProduccionAcademicaCtrl',
        controllerAs: 'crearProduccionAcademica'
      })
      .when('/editar_produccion_academica', {
        templateUrl: 'views/editar_produccion_academica.html',
        controller: 'EditarProduccionAcademicaCtrl',
        controllerAs: 'editarProduccionAcademica'
      })
      .when('/consultar_produccion_academica', {
        templateUrl: 'views/consultar_produccion_academica.html',
        controller: 'ConsultarProduccionAcademicaCtrl',
        controllerAs: 'consultarProduccionAcademica'
      })
      .when('/crear_distincion', {
        templateUrl: 'views/crear_distincion.html',
        controller: 'CrearDistincionCtrl',
        controllerAs: 'crearDistincion'
      })
      .when('/editar_distincion', {
        templateUrl: 'views/editar_distincion.html',
        controller: 'EditarDistincionCtrl',
        controllerAs: 'editarDistincion'
      })
      .when('/consultar_distincion', {
        templateUrl: 'views/consultar_distincion.html',
        controller: 'ConsultarDistincionCtrl',
        controllerAs: 'consultarDistincion'
      })
      .when('/crear_persona_idioma', {
        templateUrl: 'views/crear_persona_idioma.html',
        controller: 'CrearPersonaIdiomaCtrl',
        controllerAs: 'crearPersonaIdioma'
      })
      .when('/consultar_persona_idioma', {
        templateUrl: 'views/consultar_persona_idioma.html',
        controller: 'ConsultarPersonaIdiomaCtrl',
        controllerAs: 'consultarPersonaIdioma'
      })
      .when('/editar_persona_idioma', {
        templateUrl: 'views/editar_persona_idioma.html',
        controller: 'EditarPersonaIdiomaCtrl',
        controllerAs: 'editarPersonaIdioma'
      })
      .when('/validar_produccion_academica', {
        templateUrl: 'views/validar_produccion_academica.html',
        controller: 'ValidarProduccionAcademicaCtrl',
        controllerAs: 'validarProduccionAcademica'
      })
      .when('/consultar_investigacion', {
        templateUrl: 'views/consultar_investigacion.html',
        controller: 'ConsultarInvestigacionCtrl',
        controllerAs: 'consultarInvestigacion'
      })
      .when('/editar_investigacion', {
        templateUrl: 'views/editar_investigacion.html',
        controller: 'EditarInvestigacionCtrl',
        controllerAs: 'editarInvestigacion'
      })
      .when('/crear_investigacion', {
        templateUrl: 'views/crear_investigacion.html',
        controller: 'CrearInvestigacionCtrl',
        controllerAs: 'crearInvestigacion'
      })
      .when('/crear_experiencia_docente', {
        templateUrl: 'views/crear_experiencia_docente.html',
        controller: 'CrearExperienciaDocenteCtrl',
        controllerAs: 'crearExperienciaDocente'
      })
      .when('/editar_experiencia_docente', {
        templateUrl: 'views/editar_experiencia_docente.html',
        controller: 'EditarExperienciaDocenteCtrl',
        controllerAs: 'editarExperienciaDocente'
      })
      .when('/consultar_experiencia_docente', {
        templateUrl: 'views/consultar_experiencia_docente.html',
        controller: 'ConsultarExperienciaDocenteCtrl',
        controllerAs: 'consultarExperienciaDocente'
      })
      .when('/validar_experiencia_laboral', {
        templateUrl: 'views/validar_experiencia_laboral.html',
        controller: 'ValidarExperienciaLaboralCtrl',
        controllerAs: 'validarExperienciaLaboral'
      })
      .when('/validar_formacion_academica', {
        templateUrl: 'views/validar_formacion_academica.html',
        controller: 'ValidarFormacionAcademicaCtrl',
        controllerAs: 'validarFormacionAcademica'
      })
      .when('/crear_categoria_persona', {
        templateUrl: 'views/crear_categoria_persona.html',
        controller: 'CrearCategoriaPersonaCtrl',
        controllerAs: 'crearCategoriaPersona'
      })
      .when('/editar_categoria_persona', {
        templateUrl: 'views/editar_categoria_persona.html',
        controller: 'EditarCategoriaPersonaCtrl',
        controllerAs: 'editarCategoriaPersona'
      })
      .when('/consultar_categoria_persona', {
        templateUrl: 'views/consultar_categoria_persona.html',
        controller: 'ConsultarCategoriaPersonaCtrl',
        controllerAs: 'consultarCategoriaPersona'
      })
      .when('/validar_categoria_persona', {
        templateUrl: 'views/validar_categoria_persona.html',
        controller: 'ValidarCategoriaPersonaCtrl',
        controllerAs: 'validarCategoriaPersona'
      })
      .when('/calcular_puntaje', {
        templateUrl: 'views/calcular_puntaje.html',
        controller: 'CalcularPuntajeCtrl',
        controllerAs: 'calcularPuntaje'
      })
      .when('/validar_experiencia_docente', {
        templateUrl: 'views/validar_experiencia_docente.html',
        controller: 'ValidarExperienciaDocenteCtrl',
        controllerAs: 'validarExperienciaDocente'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

angular.module('kyronApp').run(function ($rootScope) {

  $rootScope.id = 1015438743;
  $rootScope.rol = "administrador";








});
