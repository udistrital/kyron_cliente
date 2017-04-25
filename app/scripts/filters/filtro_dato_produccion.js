'use strict';

/**
 * @ngdoc filter
 * @name kyronApp.filter:filtroDatoProduccion
 * @function
 * @description
 * # filtroDatoProduccion
 * Filter in the kyronApp.
 */
 angular.module('kyronApp')
   .filter('filtroDatoProduccion', function (produccionAcademicaServices) {
     var opcion = [];
     produccionAcademicaServices.get("opcion_dato", "").then(function (response) {

       opcion = response.data;
     });


     return function (value, scope) {


       var dato = scope.row.entity.DatoSubtipoId;

       try {






         // dato.Dominio = JSON.parse(dato.Dominio);
         // console.log(dato.Dominio.Entrada);
         var retorno = JSON.stringify(dato);
         if (retorno.includes("input")) {
           return value;
         } else if (retorno.includes("select")) {
           var indice =0;
           for(var i=0; i < opcion.length; i++){
             if(opcion[i].Id == value){
               indice = i;
             }

           }

           return opcion[indice].NombreOpcion;

         }







       } catch (error) {

       }

     };
   });
