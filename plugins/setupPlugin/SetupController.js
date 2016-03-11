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
        {
            setTimeout(function(){$state.go('Login');}, 2500);
            return;
        }

        //Init matching pattern
        $scope.pattUsername = "[\\w\\-_]{1,18}";
        $scope.pattPassword = "\\w{1,15}";
        $scope.pattdDisplayname = "[\\w\\-\\s_]{1,30}";

        //Update table for the fist time
        $scope.UpdateUserTable();
    };

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
    };

    $scope.UpdateUserTable = function()
    {
        $scope.ShowMessage("Loading users", true);
        BackendDataService.GetAllUsers().then(function(data) {$scope.users = data;});
    };

    $scope.CommitUserDeletion = function()
    {
        //check selectoin
        if($scope.ui_i_del_sel == undefined)
        {
            $scope.ShowMessage("Please select an user to delete");
            return false;
        }
        //role check
        if($scope.ui_i_del_sel.login_role == 10)
        {
            $scope.ShowMessage("You cannot delete a professor at this moment");
            return false;
        }

        //confirm and do user deletion
        if(confirm("Are you sure that you want to delete user: " + $scope.ui_i_del_sel.login_username +
            "\nDisplay name: " + $scope.ui_i_del_sel.login_displayname))
        {
            BackendDataService.RemoveUser($scope.ui_i_del_sel.login_id).then(function(data) {
                if(data)
                {
                    $scope.ShowMessage("User deletion succeeded");
                    $scope.ui_i_del_sel = undefined;
                }else{
                    $scope.ShowMessage("User deletion failed");
                }
                $scope.UpdateUserTable();
            });
        }
    };

    $scope.CommitUserCreation = function()
    {
        //check input fields
        if($scope.user_add_form.$invalid ||
            $scope.user_add_form.role.$error.required)
        {
            $scope.ShowMessage("Form incomplete or error exists, please check note.");
            return false;
        }

        //check password retype
        if($scope.ui_i_password != $scope.ui_i_repassword)
        {
            $scope.ShowMessage("Passwords do not match!");
            return false;
        }

        //do user creation
        var displayname = $scope.ui_i_displayname == "" ? $scope.ui_i_username : $scope.ui_i_displayname;
        BackendDataService.
            AddUser($scope.ui_i_username, displayname, $scope.ui_i_password, $scope.ui_i_role).
            then(function(data) {
                var msg;
                if(data) {
                    $scope.ClearFormInput();
                    $scope.ShowMessage("User creation succeeded");
                }else {
                    $scope.ShowMessage("User creation failed");
                }
                $scope.UpdateUserTable();
            });
    };

    $scope.ClearFormInput = function()
    {
        $scope.ui_i_username = undefined;
        $scope.ui_i_password = undefined;
        $scope.ui_i_repassword = undefined;
        $scope.ui_i_displayname = undefined;
        $scope.ui_i_role = undefined;
    };

    //Click handler
    $scope.GotoTimeline = function()
    {
        $state.go("Timeline");
    };
});

myApp.directive("usernameValidator", function($http, $q){
    return {
        require: "ngModel",
        controller: ["$scope", "BackendDataService", function($scope, BackendDataService){
            $scope.UsernameExist = BackendDataService.UsernameExist;}],
        link: function($scope, element, attrs, ngModel) {
            ngModel.$asyncValidators.usernameAvailable = function(modelValue, viewValue){
                return $scope.UsernameExist(viewValue).then(function(response){
                    if(response == false) {
                        return true;
                    } else {
                        return $q.reject("Username does not exist");
                    }
                });
            }
        }
    }
});