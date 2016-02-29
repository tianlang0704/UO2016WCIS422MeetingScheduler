myApp.service('BackendDataService', function($http) {

//    Database Queries

//    Check Schedule Meeting is within Free Time
//    SELECT free_start, free_end FROM FreeTime
//    WHERE free_start <= ‘$meetStart’ AND free_end >= ‘$meetEnd’
//AND login_id = ‘$loginID’ AND free_label = ‘Free Time’;

//*****************************************************************************//
//    Check Login (Only returns result if a match is found)
//    SELECT login_role FROM Login
//    WHERE login_username = ‘$username’ AND login_password = ‘$password’;
    this.CheckLogin = function(user, pass){
        return $http.get('http://qnap.tracehagan.com:30000/checkLogin/' + user + "/" + pass).then(function(data){
            return data;
        });
    };
//    Get All Times Between Dates For All Users
//    SELECT login_id, free_start, free_end FROM FreeTime
//    WHERE free_start >= ‘$startTime’ AND free_end <= ‘$endTime’
//ORDER BY login_id;
    this.GetAllTimesBetweenDates = function(Start, End){
        return this.GetAllTimesBetweenDatesForUser(Start, End, null);
    /*
        return $http.get('http://qnap.tracehagan.com:30000/getAllTimesBetweenDates/'+ Start + "/" + End).then(function(data){
            //process and format data for Google Charts, if needed (Server implementation could affect
        });
    */
    };

//    Get All Times Between Dates For Single User
//    SELECT free_start, free_end FROM FreeTime
//    WHERE free_start >= ‘$startTime’ AND free_end <= ‘$endTime’
//AND login_id = ‘$loginID’;
    this.GetAllTimesBetweenDatesForUser = function(Start, End, User){
        return $http.get('http://qnap.tracehagan.com:30000/getAllTimesBetweenDates/' + Start + '/' + End + '/' + User).then(function(data){
            //process and format data for Google Charts, if needed (Server implementation could affect

        });
    };

//    Create Meeting/Free Time ($isMeeting should be ‘Meeting’ or ‘Free Time’
//INSERT INTO `FreeTime` (`free_start`, `free_end`, `free_label`, `login_id`)
//    VALUES (‘$startTime’, ‘$endTime’, ‘$isMeeting’, ‘$userID’);

    this.AddMeetingForUser = function(Start, End, User){
        return $http.get('http://qnap.tracehagan.com:30000/createTimeForUser/' + Start + '/' + End + '/' + User + '/Meeting').then(function(data){

        });
    };

//    Delete Time For User (Login Id can be changed to username if needed)
//        DELETE FROM FreeTime
//    WHERE free_start = ‘$startTime’ AND free_end = ‘$endTime’ AND login_id = ‘$loginID’;
    this.RemoveMeetingForUser = function(Start, End, User){
        return $http.get('http://qnap.tracehagan.com:30000/removeTimeForUser/' + Start + '/' + End + '/' + User + '/1').then(function(data){

        });
    };

//    Create Meeting/Free Time ($isMeeting should be ‘Meeting’ or ‘Free Time’
//INSERT INTO `FreeTime` (`free_start`, `free_end`, `free_label`, `login_id`)
//    VALUES (‘$startTime’, ‘$endTime’, ‘$isMeeting’, ‘$userID’);
    this.AddFreeTimeForUser = function(Start, End, User){
        return $http.get('http://qnap.tracehagan.com:30000/createTimeForUser/' + Start + '/' + End + '/' + User + '/Free').then(function(data){

        });
    };

//    Delete Time For User (Login Id can be changed to username if needed)
//        DELETE FROM FreeTime
//    WHERE free_start = ‘$startTime’ AND free_end = ‘$endTime’ AND login_id = ‘$loginID’;
    this.RemoveFreeTimeForUser = function(Start, End, User){
        return $http.get('http://qnap.tracehagan.com:30000/removeTimeForUser/' + Start + '/' + End + '/' + User + '/0').then(function(data){

        });
    };

    //Todo: get allUsers query
    this.GetAllUsers = function(){
        return $http.get('http://qnap.tracehagan.com:30000/getAllFreeTime', {id: 54}).then(function(data){

        });
    };

//    Create User
//    INSERT INTO `Login` (`login_username`, `login_displayname`, `login_role`, `login_password`)
//    VALUES (‘$userName’, ‘$displayName’, ‘$roleNum’, ‘$password’);
    this.AddUser = function(Username, DisplayName, Password, PermissionsLevel){
        return $http.get('http://qnap.tracehagan.com:30000/createUser/' + Username + '/' + DisplayName + '/' + Password + '/' + PermisionsLevel).then(function(data){

        });
    };

//    Delete User
//    DELETE FROM Login
//    WHERE login_username = ‘$username’;
    this.RemoveUser = function(Username){
        return $http.get('http://qnap.tracehagan.com:30000/removeUser/' + Username).then(function(data){

        });
    };

    //Todo: Queries, implement
    this.ResetDatabase = function(){
        return $http.get('http://qnap.tracehagan.com:30000/getAllFreeTime', {id: 54}).then(function(data){

        });
    };
    this.GetMeetingsToPopulateBox = function(Start, End, User){
        return $http.get('http://qnap.tracehagan.com:30000/getAllFreeTime', {id: 54}).then(function(data){

        });
    };
    this.GetFreeTimesToPopulateBox = function(Start, End, User){
        return $http.get('http://qnap.tracehagan.com:30000/getAllFreeTime', {id: 54}).then(function(data){

        });
    };
    //
    ////this returns every free time in the databse regardless of user or date.
    //this.getAllFreeTimes = function(){
    //    var freeTimes = [];
    //    //var deferred = $q.defer();
    //
    //    return $http.get('http://qnap.tracehagan.com:30000/getAllFreeTime', {id: 54}).then(function(data){
    //        console.log("success");
    //        console.log(data);
    //        return data;
    //        //deferred.resolve(data);
    //        //this.freeTimes=data;
    //    });
    //};
    //
    ////this returns all free times for a user in the database
    //this.getAllFreeTimesForUserByID = function (id){
    //    console.debug("requesting");
    //    return $http.get('http://qnap.tracehagan.com:30000/getFreeTimeForUserByName/'+ id).then(function(data){
    //        console.log("success");
    //        //console.log(data1);
    //        var returnMe = [];
    //        if(data.data.length>1) {
    //            data.data.forEach(function (data) {
    //                var row = [data.name, data.label, new Date(data.start), new Date(data.end)];
    //                returnMe.push(row);
    //            });
    //        }else{
    //            return [[data.data.name, data.data.label, new Date(1456355691780), new Date(1456357693900)],
    //                [data.data.name, data.data.label, new Date(1456355691780), new Date(1456357693900)]];
    //        }
    //        //return [[data.name, data.label, new Date(1456355691780), new Date(1456357693900)],
    //        //    ["Name", "blah", new Date(1456356698280), new Date(1456357699680)]];
    //        return returnMe;
    //    });
    //};

});
