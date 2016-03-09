/**
 * Created by tianl on 2/28/2016.
 */

myApp.controller("SetupController", function($scope, $state, $cookieStore, BackendDataService)
{
    $scope.Init = function()
    {
        //Check login
        $scope.user = $cookieStore.get("user");
        if(!$scope.user || !$scope.user.login_privileged)
            return;

        //Update table for the fist time
        $scope.UpdateUserTable();
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

    $scope.UpdateUserTable = function()
    {
        $scope.ShowMessage("Loading users", true);
        BackendDataService.GetAllUsers().then(function(data) {$scope.users = data;});
    }

    $scope.CommitUserDeletion = function()
    {
        //check selectoin
        if($scope.ui_i_del_sel == undefined)
        {
            $scope.ShowMessage("Please select an user to delete");
            return false;
        }

        //confirm and do user deletion
        if(confirm("Are you sure that you want to delete user: " + $scope.ui_i_del_sel.login_username +
            "\nWith display name: " + $scope.ui_i_del_sel.login_displayname))
        {
            BackendDataService.RemoveUser($scope.ui_i_del_sel.login_username).then(function(data)
            {
                if(data)
                    $scope.ShowMessage("User deletion succeeded");
                else
                    $scope.ShowMessage("User deletion failed");
                $scope.UpdateUserTable();
            });
        }
    }

    $scope.CommitUserCreation = function()
    {
        //check input fields
        if($scope.user_add_form.username.$error.required ||
           $scope.user_add_form.display_name.$error.required ||
            $scope.user_add_form.password.$error.required ||
            $scope.user_add_form.re_password.$error.required ||
            $scope.user_add_form.role.$error.required)
        {
            $scope.ShowMessage("Please complete the information form!");
            return false;
        }

        //check password retype
        if($scope.ui_i_password != $scope.ui_i_repassword)
        {
            $scope.ShowMessage("Passwords do not match!");
            return false;
        }

        //do user creation
        BackendDataService.
            AddUser($scope.ui_i_username, $scope.ui_i_dname, $scope.ui_i_password, $scope.ui_i_role).
            then(function(data)
            {
                var msg;
                if(data)
                    $scope.ShowMessage("User creation succeeded");
                else
                    $scope.ShowMessage("User creation failed");
                $scope.UpdateUserTable();
            });
    }

    $scope.Timeline = function()
    {
        $state.go("Timeline");
    }
});