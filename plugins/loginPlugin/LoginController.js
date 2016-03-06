/**
 * Created by CMonk on 3/5/2016.
 */

myApp.controller("LoginController", function($scope, $state, BackendDataService)
{

    $scope.ShowMessage = function(msg, isTop)
    {
        var msgLabel = $("<label> </label>");
        msgLabel.addClass("msg_label").text(msg);
        msgLabel.opacity = 0;
        if(isTop == true)
            $("#message_container_top").append(msgLabel);
        else
            $("#message_container_bot").append(msgLabel);
        msgLabel.fadeIn(500).fadeOut(5000);
    }

    $scope.Login = function()
    {
        if($scope.login_form.login_username.$error.required ||
           $scope.login_form.login_password.$error.required)
        {
            return false;
        }

        BackendDataService.CheckLogin($scope.ui_i_username, $scope.ui_i_password).then(function(data)
        {
            if(data == -1)
            {
                $scope.ShowMessage("Login failed", true);
                return false;
            }

            BackendDataService.user = data;
            $scope.ShowMessage("Login succeeded, Jump in 2 seconds", true);
            setTimeout(function(){
                $state.go("Timeline");
                //$scope.ShowMessage("Jumping", true);
            }, 2000);
        })
    }
});