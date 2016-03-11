/**
 * Created by CMonk on 3/5/2016.
 */

myApp.controller("LoginController", function($scope, $state, $cookieStore, BackendDataService)
{
    $scope.Init = function()
    {
        $cookieStore.remove("user");
        $scope.pattUsername = "[\\w\\-_]{1,18}";
        $scope.pattPassword = "\\w{1,15}";
    }

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
        //input check
        if($scope.login_form.$invalid)
            return false;

        BackendDataService.CheckLogin($scope.ui_i_username, $scope.ui_i_password).then(function(data)
        {
            if(data == -2)
            {
                $scope.ShowMessage("Connection fail (Use Https?)", true);
                return false;
            }
            if(data == -1)
            {
                $scope.ShowMessage("Incorrect username or password", true);
                return false;
            }

            //$cookieStore.remove("user");
            data.login_privileged = data.login_role == 10 ? true : false;
            $cookieStore.put("user", data);


            $scope.ShowMessage("Login succeeded, Jump in 2 seconds", true);
            setTimeout(function(){
                $state.go("Timeline");
            }, 2000);
        });
    }
});