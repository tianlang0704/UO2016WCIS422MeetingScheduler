/**
 * Created by tianl on 2/28/2016.
 */

myApp.controller("SetupController", function($scope, $state, BackendDataService)
{
    $scope.init = function()
    {
        $scope.UpdateUserTable();
    }

    $scope.UpdateUserTable = function()
    {
        BackendDataService.getAllUsers()
            .then(function(data)
            {
                console.log(data);
                //simple code skip saving data to the model
                $scope.$apply(function(){$scope.users = data;});
            });

    }
});