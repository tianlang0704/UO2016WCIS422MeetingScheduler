myApp.controller("ClickableController", function($scope, $state, BackendDataService){

    $scope.getAllUsers = function(){
        BackendDataService.getAllFreeTimes().then(function(data){
            console.log(data);
        });
    }

    $scope.getAllFreeTimesForUserByID =function(id){
        BackendDataService.getAllFreeTimesForUserByID(id).then(function(data){
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
    }

});