"use strict";

/**
 * @ngdoc function
 * @name kyronApp.decorator:TextTranslate
 * @description
 * # TextTranslate
 * Decorator of the kyronApp
 */
var text_es = {
  TITULO: "Sistema de Gestión de Información Docente - KYRON",
  MENSAJE_INICIAL: "Bienvenido",
};

var text_en = {
  TITULO: "GENERATOR-OAS",
  MENSAJE_INICIAL: "Now get to start to develop ..."
};

angular.module('kyronApp')
  .config(function($translateProvider) {
    $translateProvider
      .translations("es", text_es)
      .translations("en", text_en);
    $translateProvider.preferredLanguage("es");
    $translateProvider.useSanitizeValueStrategy("sanitizeParameters");
  });
