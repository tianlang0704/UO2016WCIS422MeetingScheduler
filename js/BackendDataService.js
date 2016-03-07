myApp.service('BackendDataService', function($http) {

//    Database Queries

//    Check Schedule Meeting is within Free Time
//    SELECT free_start, free_end FROM FreeTime
//    WHERE free_start <= ‘$meetStart’ AND free_end >= ‘$meetEnd’
//AND login_id = ‘$loginID’ AND free_label = ‘Free Time’;

//*****************************************************************************//

    // Functions, returns -1 if no user, value for role if user exists
    this.CheckLogin = function(user, pass){
        return sha512(pass).then(function(password){
            return $http.get('http://qnap.tracehagan.com:30000/checkLogin/' + user + "/" + password).then(function(data){
                console.log(data);
                if(data.data.length===1){
                    return data.data[0];
                }else{
                    return -1;
                }
            });
        });
    };
    // functions
    this.GetAllTimesBetweenDates = function(Start, End){
        return this.GetAllTimesBetweenDatesForUser(Start, End, null);
    };

    // Functions, formats data correctly for users
    this.GetAllTimesBetweenDatesForUser = function(Start, End, User){
        //date.getDate date.getMonth date.getFullYear
        S = Start.getTime()/1000;
        E = End.getTime()/1000;
        return $http.get('http://qnap.tracehagan.com:30000/getAllTimesBetweenDates/' + S + '/' + E + '/' + User).then(function(rawdata){
            //process and format data for Google Charts, if needed (Server implementation could affect
            var day = Start.getDate();
            var month = Start.getMonth();
            var year = Start.getFullYear();
            //new Date(year,month,day,7,0,0,0)
            //new Date(year,month,day,7,0,0,1)
            //new Date(year,month,day,19,0,0,0)
            //new Date(year,month,day,19,0,0,1)
            var data = rawdata.data;
            var returnMe = [];
            console.log(data);
            data.forEach(function(d){
                returnMe.push([d.login_displayname, d.free_label, new Date(d.free_start*1000), new Date(d.free_end*1000)]);
                console.log(d);
            });
            //returnMe.push([data[0].login_displayname, '', new Date(year,month,day,6,0,0,0), new Date(year,month,day,6,0,0,1)]);
            //returnMe.push([data[0].login_displayname, '', new Date(year,month,day,19,0,0,0), new Date(year,month,day,19,0,0,1)]);
            return returnMe;
            //attach a millisecond at 7am and a millisecond at 7pm for the single user or for all users

        });
    };

// Functions
    this.AddMeetingForUser = function(Start, End, User){
        console.log(End);
        console.log(Start);
        console.log(End.getMilliseconds());
        console.log(Start.getMilliseconds());
        Start = Start.getTime()/1000;
        End = End.getTime()/1000;
        console.log(End);
        console.log(Start);
        return $http.get('http://qnap.tracehagan.com:30000/createTimeForUser/' + Start + '/' + End + '/' + User + '/Meeting').then(function(data){
            //indicate success or failure
            if(data.data.affectedRows > 0 || data.data.changedRows > 0)
                return true;
            else
                return false;
        });
    };

//    Delete Time For User (Login Id can be changed to username if needed)
//        DELETE FROM FreeTime
//    WHERE free_start = ‘$startTime’ AND free_end = ‘$endTime’ AND login_id = ‘$loginID’;
    this.RemoveMeetingForUser = function(Start, End, User){
        return $http.get('http://qnap.tracehagan.com:30000/removeTimeForUser/' + Start + '/' + End + '/' + User).then(function(data){
            //indicate sucess or failure
        });
    };

    // Functions
    this.AddFreeTimeForUser = function(Start, End, User){
        console.log(End);
        console.log(Start);
        console.log(End.getMilliseconds());
        console.log(Start.getMilliseconds());
        Start = Start.getTime()/1000;
        End = End.getTime()/1000;
        console.log(End);
        console.log(Start);
        return $http.get('http://qnap.tracehagan.com:30000/createTimeForUser/' + Start + '/' + End + '/' + User + '/Free').then(function(data){
            //indicate success or failure
            if(data.data.affectedRows > 0 || data.data.changedRows > 0)
                return true;
            else
                return false;
        });
    };

//    Delete Time For User (Login Id can be changed to username if needed)
//        DELETE FROM FreeTime
//    WHERE free_start = ‘$startTime’ AND free_end = ‘$endTime’ AND login_id = ‘$loginID’;
    this.RemoveFreeTimeForUser = function(Start, End, User){
        Start = Start.getTime()/1000;
        End = End.getTime()/1000;
        return $http.get('http://qnap.tracehagan.com:30000/removeTimeForUser/' + Start + '/' + End + '/' + User).then(function(data){
            //indicate success or failure
            return data.data.success;
        });
    };

    //Implemented, needs testing
    this.GetAllUsers = function(){
        return $http.get('http://qnap.tracehagan.com:30000/getAllUsers').then(function(data){
            //return array of user objects
            if(data.data.length > 0) {
                return data.data;
            }
            return -1;
        });
    };

//    Functions, returns object
    this.AddUser = function(Username, DisplayName, Password, PermissionsLevel){
        return sha512(Password).then(function(pass){
            return $http.get('http://qnap.tracehagan.com:30000/createUser/' + Username + '/' + DisplayName + '/' + pass + '/' + PermissionsLevel).then(function(data){
                //indicate success or failure
                return data.data.success;
            });
        });
    };

//    Implemented, need to test
    this.RemoveUser = function(Username){
        return $http.get('http://qnap.tracehagan.com:30000/removeUser/' + Username).then(function(data){
            //indicate success or failure
            return data.data.success;
        });
    };

    //Todo: Queries, implement
    this.ResetDatabase = function(){
        return $http.get('http://qnap.tracehagan.com:30000/getAllFreeTime').then(function(data){
            //indicate success or failure
            return data;
        });
    };
    this.GetMeetingsToPopulateBox = function(Start, End, User){
        return $http.get('http://qnap.tracehagan.com:30000/getAllFreeTime').then(function(data){
            //array of time objects?
        });
    };
    this.GetFreeTimesToPopulateBox = function(Start, End, User){
        return $http.get('http://qnap.tracehagan.com:30000/getAllFreeTime').then(function(data){
            //array of time objects?
        });
    };

    this.GetUserIDByUserName = function(username){
        return $http.get('http://qnap.tracehagan.com:30000/getIDforUser/' + username).then(function(data){
            //array of time objects?
            return data.data[0].login_id;
        });
    };

    // **********************************************************************************************
    //below is mozilla code from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest with modifications
    var sha512 = function(str) {
        // We transform the string into an arraybuffer.
        var buffer = new TextEncoder("utf-8").encode(str);
        return crypto.subtle.digest("SHA-512", buffer).then(function (hash) {
            return hex(hash);
        });
    };
    this.sha512 = sha512;

    var hex = function(buffer) {
        var hexCodes = [];
        var view = new DataView(buffer);
        for (var i = 0; i < view.byteLength; i += 4) {
            // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
            var value = view.getUint32(i);
            // toString(16) will give the hex representation of the number without padding
            var stringValue = value.toString(16);
            // We use concatenation and slice for padding
            var padding = '00000000';
            var paddedValue = (padding + stringValue).slice(-padding.length);
            hexCodes.push(paddedValue);
        }

        // Join all the hex strings into one
        return hexCodes.join("");
    };
    // **********************************************************************************************
});
