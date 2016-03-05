/**
 * Created by tianl on 2/28/2016.
 */

myApp.controller("SetupController", function($scope, $state, BackendDataService)
{
    $scope.Init = function()
    {
        $scope.UpdateUserTable();
    }

    $scope.ShowMessage = function(msg, color, fadeOutDuration, isTop)
    {
        var msgLabel = $("<label> </label>");
        msgLabel.addClass("msg_label").text(msg);
        msgLabel.opacity = 0;
        if(isTop == true)
            $("#message_container_top").append(msgLabel);
        else
            $("#message_container_bot").append(msgLabel);
        msgLabel.fadeIn(500).fadeOut(fadeOutDuration);
    }

    $scope.UpdateUserTable = function()
    {
        $scope.ShowMessage("Loading users", "red", 5000, true);
        BackendDataService.GetAllUsers()
            .then(function(data)
            {
                console.log(data);
                //simple code skip saving data to the model
                $scope.$apply(function(){$scope.users = data;});
            });
    }

    $scope.CommitUserDeletion = function()
    {
        //check selectoin
        if($scope.ui_i_del_sel == undefined)
        {
            $scope.ShowMessage("Please select an user to delete", "red", 5000);
            return false;
        }

        //confirm and do user deletion
        if(confirm("Are you sure that you want to delete user: " + $scope.ui_i_del_sel.username +
            "\nWith display name: " + $scope.ui_i_del_sel.displayname))
        {
            BackendDataService.RemoveUser($scope.ui_i_del_sel.username).then(function(data)
            {
                if(data.success)
                    $scope.ShowMessage("User deletion succeeded", "red", 5000);
                else
                    $scope.ShowMessage("User deletion failed", "red", 5000);

                $scope.UpdateUserTable();
            });
        }
    }

    $scope.CommitUserInfo = function()
    {
        //check input fields
        if($scope.user_add_form.username.$error.required == true ||
           $scope.user_add_form.display_name.$error.required == true ||
            $scope.user_add_form.password.$error.required == true ||
            $scope.user_add_form.re_password.$error.required == true ||
            $scope.user_add_form.role.$error.required == true) {
            $scope.ShowMessage("Please complete the information form!", "red", 5000);
            return false;
        }

        //check password retype
        if($scope.ui_i_password != $scope.ui_i_repassword)
        {
            $scope.ShowMessage("Passwords do not match!", "red", 5000);
            return false;
        }

        //do user creation
        var pass = BackendDataService.sha512($scope.ui_i_password);
        BackendDataService.
            AddUser($scope.ui_i_username, $scope.ui_i_dname, pass, $scope.ui_i_role).
            then(function(data)
            {
                var msg;
                if(data == -1)
                    msg = "Failed creating new user!";
                else {
                    if(data == 0)
                        msg = "An user with the role of 'Professor' is created";
                    else
                        msg = "An user with the role of 'Student' is created";
                }
                $scope.ShowMessage(msg, "red", 5000);
                $scope.UpdateUserTable();
            });
    }
});