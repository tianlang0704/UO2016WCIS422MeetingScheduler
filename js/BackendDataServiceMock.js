myApp.service('BackendDataService', function($http, $q) {

    //this returns every free time in the databse regardless of user or date.
    this.getAllTimes = function(){
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
    this.getAllTimesForUserByID = function (id){
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
    this.getAllTimesForUserBetweenDates = function(userid, start, end){
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
    this.getAllTimesBetweenDates = function(start,end){
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
    this.addFreeTimeForUser = function(userid, start, end){
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
    this.createUser = function(username, pass){
        var p1 = new Promise(
            // The resolver function is called with the ability to resolve or
            // reject the promise
            function(resolve, reject) {
                window.setTimeout(
                    function() {
                        // We fulfill the promise !
                        resolve(2);
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
    this.checkLogin = function(username, pass){
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
    this.setNewMeeting = function(user1,user2){
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

});
