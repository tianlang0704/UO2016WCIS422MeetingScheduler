/**
 * Created by tracehagan on 2/7/16.
 */
myApp.controller("MainController", function($scope, $state, CharterService){
    $scope.graphData = function (bindto, nodes, functions){
        CharterService.createChart(bindto, nodes, functions);
    }

    $scope.DataServicePrototype = function (){
        $state.go('DataServiceTest');
    };

    $scope.checkbox = function (){
        $state.go('CheckBox');
    };

    $scope.home = function (){
        $state.go('home');
    };

    $scope.clickable = function (){
        $state.go('Clickable');
    }

});