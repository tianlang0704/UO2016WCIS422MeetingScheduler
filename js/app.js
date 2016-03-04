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
      .state("Example",{
        url: '/Example',
        views: {
          'appView':{
            templateUrl: "plugins/examplePlugin/example.html"
          }
        }
      })
      .state("Setup",{
        url: '/Setup',
        views: {
          'appView':{
              templateUrl: "plugins/setupPlugin/setup.html"
          }
        }
      });
});
//angular.bootstrap(document.documentElement, ['myApp']);
