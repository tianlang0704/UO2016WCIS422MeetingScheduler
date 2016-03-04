myApp.controller("ExampleController", function($scope, $state, BackendDataService){

    $scope.getAllUsers = function(){
        BackendDataService.getAllFreeTimes().then(function(data){
            console.log(data);
        });
    };

    $scope.insertTime = function(){
      BackendDataService.AddMeetingForUser(new Date(2016,2,3,7,0,0), new Date(2016,2,3,8,0,0), 1);
    };

    $scope.checkLogin = function(){
            BackendDataService.CheckLogin('admin', 'password').then(function(data){
                console.log(data);

            });
    };

    $scope.getAllFreeTimesForUserByID = function(id){
        BackendDataService.GetAllTimesBetweenDatesForUser(new Date(2016,2,3,6,0,0), new Date(2016,2,3,9,0,0), 1).then(function(data){
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

});