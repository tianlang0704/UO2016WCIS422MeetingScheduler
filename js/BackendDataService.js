myApp.service('BackendDataService', function($http, $q) {

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

    this.getAllFreeTimesForUserByID = function (id){
        console.debug("requesting");
        return $http.get('http://qnap.tracehagan.com:30000/getFreeTimeForUserByName/'+ id).then(function(data1){
            console.log("success");
            //console.log(data1);
            var returnMe = [];
            /*data.data.forEach(function(data){
                var row = [data.name, data.label, new Date(data.start), new Date(data.end)];
                returnMe.push(row);
            });*/
            var data = data1.data;
            //console.debug(data);
            //console.debug([[data.name, data.label, new Date(data.start), new Date(data.end)],
             //               ["blah", "blah", new Date(0,0,0,14,0,0), new Date(0,0,0,15,30,0)]]);

            //console.debug([[ 'Magnolia Room', 'Beginning JavaScript',       new Date(0,0,0,12,0,0),  new Date(0,0,0,13,30,0) ],
            //    [ 'Magnolia Room', 'Intermediate JavaScript',    new Date(0,0,0,14,0,0),  new Date(0,0,0,15,30,0) ],
            //    [ 'Magnolia Room', 'Advanced JavaScript',        new Date(0,0,0,16,0,0),  new Date(0,0,0,17,30,0) ],
            //    [ 'Willow Room',   'Beginning Google Charts',    new Date(0,0,0,12,30,0), new Date(0,0,0,14,0,0) ],
            //    [ 'Willow Room',   'Intermediate Google Charts', new Date(0,0,0,14,30,0), new Date(0,0,0,16,0,0) ],
            //    [ 'Willow Room',   'Advanced Google Charts',     new Date(0,0,0,16,30,0), new Date(0,0,0,18,0,0) ]]);
            console.debug(Date.now());
            return [[data.name, data.label, new Date(1456355691780), new Date(1456357693900)],
                ["Name", "blah", new Date(1456356698280), new Date(1456357699680)]];
            //deferred.resolve(data);
            //this.freeTimes=data;
        });
    };

    this.processLogin = function (user, pass){

    }

});
