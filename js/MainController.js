/**
 * Created by tracehagan on 2/7/16.
 */
myApp.controller("MainController", function($scope, $state){
    $scope.state = $state;
    $scope.examplePlugin = function (){
        $state.go('Example');
    };
    $scope.setupPlugin = function (){
        $state.go('Setup');
    };
    $scope.loginPlugin = function (){
        $state.go('Login');
    };
});