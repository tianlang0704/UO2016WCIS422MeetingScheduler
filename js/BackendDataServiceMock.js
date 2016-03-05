myApp.service('BackendDataService', function($http) {
    this.RemoveUser = function(Username){
        var p1 = new Promise(
            // The resolver function is called with the ability to resolve or
            // reject the promise
            function(resolve, reject) {
                window.setTimeout(
                    function() {
                        // We fulfill the promise !
                        resolve({success: true});
                    }, Math.random() * 2000 + 1000);
            });
        return p1;
    };

    this.GetAllUsers = function(){
        var p1 = new Promise(
            // The resolver function is called with the ability to resolve or
            // reject the promise
            function(resolve, reject) {
                window.setTimeout(
                    function() {
                        // We fulfill the promise !
                        var user = {};
                        user.id = 0;
                        user.username = "username0";
                        user.displayname = "display name 0";
                        user.role = 0;
                        var arr = [user];
                        for(i = 1; i < 20; i++)
                        {
                            var user = {};
                            user.id = i;
                            user.username = "username" + i;
                            user.displayname = "display name " + i;
                            user.role = 1;
                            arr.push(user);
                        }
                        resolve(arr);
                    }, Math.random() * 2000 + 1000);
            });
        return p1;
    };

    //this returns every free time in the databse regardless of user or date.
    this.GetAllTimes = function(){
        var p1 = new Promise(
            // The resolver function is called with the ability to resolve or
            // reject the promise
            function(resolve, reject) {
                window.setTimeout(
                    function() {
                        // We fulfill the promise !
                        resolve([
                            ["Professor", "Free Time", new Date(1456355691780), new Date(1456357693900)],
                            ["Professor", "Free Time", new Date(1456357783900), new Date(1456357993900)],
                            ["Professor", "Free Time", new Date(1456367783900), new Date(1456367993900)],
                            ["Team 1", "Free Time", new Date(1456355691780), new Date(1456357693900)],
                            ["Team 1", "Free Time", new Date(1456367783900), new Date(1456367993900)]
                        ]);
                    }, Math.random() * 2000 + 1000);
            });
        return p1;

    };

    //this returns all free times for a user in the database
    this.GetAllTimesForUserByID = function (id){
        var p1 = new Promise(
            // The resolver function is called with the ability to resolve or
            // reject the promise
            function(resolve, reject) {
                window.setTimeout(
                    function() {
                        // We fulfill the promise !
                        resolve([
                            ["Professor", "Free Time", new Date(1456355691780), new Date(1456357693900)],
                            ["Professor", "Free Time", new Date(1456357783900), new Date(1456357993900)],
                            ["Professor", "Free Time", new Date(1456367783900), new Date(1456367993900)]
                        ]);
                    }, Math.random() * 2000 + 1000);
            });
        return p1;
    };

    //returns all free times for a user between two given date/times
    //@return
    //  object of all free times between two give date/times read for Google Charts
    //@params
    //  userid: username
    //  start: int of miliseconds for date/time of start
    //  end: int of milliseconds for date/time of end
    this.GetAllTimesForUserBetweenDates = function(userid, start, end){
        var p1 = new Promise(
            // The resolver function is called with the ability to resolve or
            // reject the promise
            function(resolve, reject) {
                window.setTimeout(
                    function() {
                        // We fulfill the promise !
                        resolve([
                            ["Professor", "Free Time", new Date(1456355691780), new Date(1456357693900)],
                            ["Professor", "Free Time", new Date(1456357783900), new Date(1456357993900)],
                            ["Professor", "Free Time", new Date(1456367783900), new Date(1456367993900)]
                        ]);
                    }, Math.random() * 2000 + 1000);
            });
        return p1;
    };

    //returns all free times between two given date/times (should be used by professor for total team view)
    //@return
    //  object of all free times between two given date/times ready for Google Charts
    //@params
    //  start: int of miliseconds for date/time of start
    //  end: int of milliseconds for date/time of end
    this.GetAllTimesBetweenDates = function(start,end){
        var p1 = new Promise(
            // The resolver function is called with the ability to resolve or
            // reject the promise
            function(resolve, reject) {
                window.setTimeout(
                    function() {
                        // We fulfill the promise !
                        resolve([
                            ["Professor", "Free Time", new Date(1456355691780), new Date(1456357693900)],
                            ["Professor", "Free Time", new Date(1456357783900), new Date(1456357993900)],
                            ["Professor", "Free Time", new Date(1456367783900), new Date(1456367993900)],
                            ["Team 1", "Free Time", new Date(1456355691780), new Date(1456357693900)],
                            ["Team 1", "Free Time", new Date(1456367783900), new Date(1456367993900)]
                        ]);
                    }, Math.random() * 2000 + 1000);
            });
        return p1;
    };

    //adds a free time for a user
    //@return
    //  0 for success, -1 for failure
    //@params
    //  userid: username
    //  start: int of miliseconds for date/time of start
    //  end: int of milliseconds for date/time of end
    this.AddFreeTimeForUser = function(userid, start, end){
        var p1 = new Promise(
            // The resolver function is called with the ability to resolve or
            // reject the promise
            function(resolve, reject) {
                window.setTimeout(
                    function() {
                        // We fulfill the promise !
                        resolve(0);
                    }, Math.random() * 2000 + 1000);
            });
        return p1;
    };

    //creates a user  (used by professor)
    //@return
    //  returns -1 on failure, >=0 on success
    //@params
    //  userid: username
    //  pass: password (hash?)
    this.AddUser = function(Username, DisplayName, Password, PermissionsLevel){
        var p1 = new Promise(
            // The resolver function is called with the ability to resolve or
            // reject the promise
            function(resolve, reject) {
                window.setTimeout(
                    function() {
                        // We fulfill the promise !
                        resolve(1);
                    }, Math.random() * 2000 + 1000);
            });
        return p1;
    };

    //checks login,
    //@return
    //  permission level for successful login(>=0), -1 for failed login
    //@params
    //  userid: username
    //  pass: password (hash?)
    this.CheckLogin = function(username, pass){
        var p1 = new Promise(
            // The resolver function is called with the ability to resolve or
            // reject the promise
            function(resolve, reject) {
                window.setTimeout(
                    function() {
                        // We fulfill the promise !
                        resolve(1);
                    }, Math.random() * 2000 + 1000);
            });
        return p1;
    };

    //gets all meetings for a user
    //@return
    //  object with data properly formatted for google charts
    //@params
    //  userid: username
    /*this.getAllMeetingsForUser = function(userid){
        return $http.get('http://qnap.tracehagan.com:30000/getMeetings/userid').then(function(data){

        });
    };*/

    //creates a meeting  (used by professor)
    //@return
    //  -1 on failure, 0 on success
    //@params
    //  user1: username1 (professor username)
    //  user2: username2 (team username)
    this.SetNewMeeting = function(user1,user2){
        var p1 = new Promise(
            // The resolver function is called with the ability to resolve or
            // reject the promise
            function(resolve, reject) {
                window.setTimeout(
                    function() {
                        // We fulfill the promise !
                        resolve(0);
                    }, Math.random() * 2000 + 1000);
            });
        return p1;
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