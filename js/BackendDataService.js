myApp.service('BackendDataService', function($http, $q) {

    //this returns every free time in the databse regardless of user or date.
    this.getAllFreeTimes = function(){
        var freeTimes = [];
        //var deferred = $q.defer();

        return $http.get('http://qnap.tracehagan.com:30000/getAllFreeTime', {id: 54}).then(function(data){
            console.log("success");
            console.log(data);
            return data;
            //deferred.resolve(data);
            //this.freeTimes=data;
        });
    };

    //this returns all free times for a user in the database
    this.getAllFreeTimesForUserByID = function (id){
        console.debug("requesting");
        return $http.get('http://qnap.tracehagan.com:30000/getFreeTimeForUserByName/'+ id).then(function(data){
            console.log("success");
            //console.log(data1);
            var returnMe = [];
            if(data.data.length>1) {
                data.data.forEach(function (data) {
                    var row = [data.name, data.label, new Date(data.start), new Date(data.end)];
                    returnMe.push(row);
                });
            }else{
                return [[data.data.name, data.data.label, new Date(1456355691780), new Date(1456357693900)],
                    [data.data.name, data.data.label, new Date(1456355691780), new Date(1456357693900)]];
            }
            //return [[data.name, data.label, new Date(1456355691780), new Date(1456357693900)],
            //    ["Name", "blah", new Date(1456356698280), new Date(1456357699680)]];
            return returnMe;
        });
    };

    //returns all free times for a user between two given date/times
    //@return
    //  object of all free times between two give date/times read for Google Charts
    //@params
    //  userid: username
    //  start: int of miliseconds for date/time of start
    //  end: int of milliseconds for date/time of end
    this.GetAllFreeTimesForUserBetweenDates = function(userid, start, end){
        return $http.get('http://qnap.tracehagan.com:30000/getFreeTimesBetween/start/end/userid').then(function(data){

        });
    };

    //returns all free times between two given date/times (should be used by professor for total team view)
    //@return
    //  object of all free times between two given date/times ready for Google Charts
    //@params
    //  userid: username
    //  start: int of miliseconds for date/time of start
    //  end: int of milliseconds for date/time of end
    this.GetAllFreeTimesBetweenDates = function(start,end){
        return $http.get('http://qnap.tracehagan.com:30000/getFreeTimesBetween/start/end').then(function(data){

        });
    };

    //adds a free time for a user
    //@return
    //  0 for success, -1 for failure
    //@params
    //  userid: username
    //  start: int of miliseconds for date/time of start
    //  end: int of milliseconds for date/time of end
    this.AddFreeTimeForUser = function(userid, start, end){
        return $http.get('http://qnap.tracehagan.com:30000/addFreeTime/start/end/userid').then(function(data){

        });
    };

    //creates a user  (used by professor)
    //@return
    //  returns -1 on failure, >=0 on success
    //@params
    //  userid: username
    //  pass: password (hash?)
    this.CreateUser = function(username, pass){
        return $http.get('http://qnap.tracehagan.com:30000/createUser/username/pass').then(function(data){

        });
    };

    //checks login,
    //@return
    //  permission level for successful login(>=0), -1 for failed login
    //@params
    //  userid: username
    //  pass: password (hash?)
    this.CheckLogin = function(username, pass){
        return $http.get('http://qnap.tracehagan.com:30000/checkLogin/username/pass').then(function(data){

        });
    };

    //gets all meetings for a user
    //@return
    //  object with data properly formatted for google charts
    //@params
    //  userid: username
    this.GetAllMeetingsForUser = function(userid){
        return $http.get('http://qnap.tracehagan.com:30000/getMeetings/userid').then(function(data){

        });
    };

    //creates a meeting  (used by professor)
    //@return
    //  -1 on failure, 0 on success
    //@params
    //  user1: username1 (professor username)
    //  user2: username2 (team username)
    this.SetNewMeeting = function(user1,user2){
        return $http.get('http://qnap.tracehagan.com:30000/getMeetings/userid').then(function(data){

        });
    };

});
