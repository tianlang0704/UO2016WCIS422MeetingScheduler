/**
 * Created by tracehagan on 2/7/16.
 */
myApp.controller("MainController", function($scope, $state, $cookieStore, BackendDataService){
    $scope.state = $state;
    $scope.$watch(function(){return $cookieStore.get("user") == undefined ? false : $cookieStore.get("user").login_privileged;},
        function(data){
            $scope.login_privileged = data;
        });

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