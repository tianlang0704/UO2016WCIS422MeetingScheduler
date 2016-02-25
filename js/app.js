'use strict';

google.charts.load('current', {'packages':['timeline']});
google.charts.setOnLoadCallback(function() {
    angular.bootstrap(document.body, ['myApp']);
});

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ui.router'
]);

myApp.config(function($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
      .state("home", {
        url: "/home",
        views: {
          'appView':{
            templateUrl: "plugins/home/home.html"
          }
        }
      })
      .state("DataServiceTest",{
        url: '/DataServiceTest',
        views: {
          'appView':{
            templateUrl: "plugins/DataServiceTest/dataservicetest.html"
          }
        }
      })
      .state("Clickable",{
        url: '/Clickable',
        views: {
          'appView':{
            templateUrl: "plugins/clickable/clickable.html"
          }
        }
      })
      .state("CheckBox",{
        url: '/CheckBox',
        views: {
          'appView':{
            templateUrl: "plugins/CheckBox/checkbox.html"
          }
        }
      });

});
//angular.bootstrap(document.documentElement, ['myApp']);
