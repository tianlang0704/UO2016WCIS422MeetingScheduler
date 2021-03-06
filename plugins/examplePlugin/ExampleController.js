myApp.controller("ExampleController", function($scope, $state, BackendDataService){

    $scope.getAllUsers = function(){
        BackendDataService.getAllFreeTimes().then(function(data){
            console.log(data);
        });
    };

    $scope.insertTime = function(){
        BackendDataService.AddMeetingForUser(new Date(2016,2,4,7,0,0), new Date(2016,2,4,8,0,0), 1);
        BackendDataService.AddMeetingForUser(new Date(2016,2,4,7,0,0), new Date(2016,2,4,8,0,0), 4);
    };

    $scope.checkLogin = function(){
            BackendDataService.CheckLogin('admin', 'password').then(function(data){
                console.log(data);
            });
    };

    $scope.getAllFreeTimes = function(){
        BackendDataService.GetAllTimesBetweenDates(new Date(2016,2,4,0,0,0), new Date(2016,2,4,23,59,0)).then(function(data){
            console.log(data);
            function drawChart() {
                var container = document.getElementById('timeline');
                console.debug(container);
                var chart = new google.visualization.Timeline(container);
                console.debug(chart);
                var dataTable = new google.visualization.DataTable();
                dataTable.addColumn({ type: 'string', id: 'Room' });
                dataTable.addColumn({ type: 'string', id: 'Name' });
                dataTable.addColumn({ type: 'date', id: 'Start' });
                dataTable.addColumn({ type: 'date', id: 'End' });
                dataTable.addRows(data);

                var options = {
                    timeline: { colorByRowLabel: true }
                };
                console.log("drawing");
                chart.draw(dataTable, options);
            }
            drawChart();
        });
    };
    $scope.getAllFreeTimesForUser = function(){
        BackendDataService.GetAllTimesBetweenDatesForUser(new Date(2016,2,4,6,0,0), new Date(2016,2,4,9,0,0), 1).then(function(data){
            console.log(data);
            function drawChart() {

                var container = document.getElementById('timeline');
                console.debug(container);
                var chart = new google.visualization.Timeline(container);
                console.debug(chart);
                var dataTable = new google.visualization.DataTable();
                dataTable.addColumn({ type: 'string', id: 'Room' });
                dataTable.addColumn({ type: 'string', id: 'Name' });
                dataTable.addColumn({ type: 'date', id: 'Start' });
                dataTable.addColumn({ type: 'date', id: 'End' });
                dataTable.addRows(data);

                var options = {
                    timeline: { colorByRowLabel: true }
                };
                console.log("drawing");
                chart.draw(dataTable, options);
            }
            drawChart();
        });
    };
    $scope.removeTimeForUser = function(){

    };
    $scope.addUser = function(){
        BackendDataService.AddUser('trace2', 'Trace2', 'password', '20').then(function(success){
            console.log(success);
           if(success.data.success==true){
               console.log("User added successfully");
           } else {
               console.log("fail");
           }
        });
    };
    $scope.removeUser = function(){
        BackendDataService.RemoveUser("trace").then(function(data){
            if(data.data.success==true){
                console.log("user removed");
            }else{
                console.log("fail");
            }
        });
    };
    $scope.GetUserIDByUserName = function(){
        BackendDataService.GetUserIDByUserName("admin").then(function(data){
            console.log(data);
        });
    };
    $scope.GetAllUsers = function(){
        BackendDataService.GetAllUsers().then(function(data){
            console.log(data);
        });
    };

});