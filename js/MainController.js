/**
 * Created by tracehagan on 2/7/16.
 */
myApp.controller("MainController", function($scope, $state, $cookieStore){
    $scope.state = $state;

    $scope.$watch(function(){return $cookieStore.get("user");},
        function(newValue, oldValue){if(newValue) $scope.user = newValue; else $scope.user = {no_login: true};},
        true);

    $scope.$state = $state;

    $scope.examplePlugin = function (){
        $state.go('Example');
    };
    $scope.setupPlugin = function (){
        $state.go('Setup');
    };
    $scope.loginPlugin = function (){
        $cookieStore.remove("user");
        $state.go('Login');
    };
    $scope.timelinePlugin = function (){
        $state.go('Timeline');
    };
});