/**
 * Created by CMonk on 3/6/2016.
 */

myApp.controller("TimelineController", function($scope, $state, $cookieStore, BackendDataService){
    //Init is called page finish loading
    $scope.Init = function()
    {
        //Check login
        $scope.user = $cookieStore.get("user");
        if(!$scope.user)
        {
            setTimeout(function(){$state.go('Login');}, 2500);
            return;
        }

        //Init chart
        var container = document.getElementById('timeline_chart_user');
        $scope.ui_o_chart = new google.visualization.Timeline(container);

        //Add basic interaction between chart and edits
        //Setting start and end select value when time frame in chart is clicked
        google.visualization.events.addListener($scope.ui_o_chart, 'select', function(){
            var selected = $scope.ui_o_chart.getSelection(); //find selected time
            //set the target user id
            if($scope.users)
                $scope.ui_i_target = $scope.users.find(function(element){return element.login_displayname == $scope.timelineModel.data[selected[0].row][0]});
            //find their relative offset in the day in minutes
            var startDate = $scope.timelineModel.data[selected[0].row][2]; //getting start date from 1970 to start
            var endDate = $scope.timelineModel.data[selected[0].row][3]; //getting end date from 1970 to end
            var baseDate = new Date(startDate.getTime()); //getting base date from 1970 to today's 0am
            baseDate.setHours(0,0,0,0);
            var startOffsetTime = Math.abs(baseDate - startDate) / 60000; //get start time in offset in minutes
            var endOffsetTime = Math.abs(baseDate - endDate) / 60000; //get end time in offset in minutes
            var startIndex = $scope.timeOptions.findIndex(function(element, index, array){
                if(element.offsetInMins == startOffsetTime) return true; else return false; }); //find the start offset in select
            var endIndex = $scope.timeOptions.findIndex(function(element, index, array){
                if(element.offsetInMins == endOffsetTime) return true; else return false; }); //find the end offset in select
            $scope.$apply(function(){$scope.ui_i_start = $scope.timeOptions[startIndex]}); //set select value
            $scope.$apply(function(){$scope.ui_i_end = $scope.timeOptions[endIndex]}); //set select value
        });

        //Set auto resize chart
        $(window).resize(function(){
            $scope.ShowTimeline( $scope.timelineModel.data, $scope.timelineModel.opt);
        });

        //Generate options for time
        $scope.timeOptions = OptionGenerator();

        //Initialize necessary ui models
        $scope.ui_i_date = new Date();
        $scope.ui_i_days = 1;
        $scope.timelineModel = {};

        //Update time line for the first time
        $scope.UpdateTimeline($scope.ui_i_days);

        //Init user list if is privileged user
        if($scope.user.login_privileged)
            BackendDataService.GetAllUsers().then(function(data) {
                $scope.users = data;
            });
    };

    //Insert message into the containers user jQuery Animations
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

    //Option generator for time select used in Init()
    //input: optional, int, start hour in the day
    //       optional, int, end hour in the day
    var OptionGenerator = function(start, end)
    {
        if(start < 0 || end > 24 || start >= end)
            start = end = undefined;
        start = start == undefined ? 0 : start;
        end = end == undefined ? 24 : end;

        var startHalfHour = start * 2, endHalfHour = end * 2;
        var options = [];
        var counter = 0;
        for(var i = startHalfHour; i <= endHalfHour; i++, counter++)
        {
            var minutes = i * 30;
            options[counter] = {};
            options[counter].label = ("0" + Math.floor(minutes / 60)).slice(-2) + ":" + ("0" + (minutes % 60)).slice(-2);
            options[counter].offsetInMins = minutes;
        }
        return options;
    };

    //Click handler for date bar button
    $scope.prevNDay = function(n)
    {
        $scope.ui_i_date = new Date($scope.ui_i_date.getTime() - n * 24 * 3600 * 1000);
        $scope.UpdateTimeline($scope.ui_i_days);
    };

    //Click handler for date bar button
    $scope.nextNDay = function(n)
    {
        $scope.ui_i_date = new Date($scope.ui_i_date.getTime() + n * 24 * 3600 * 1000);
        $scope.UpdateTimeline($scope.ui_i_days);
    };

    //Show time line with data and options
    $scope.ShowTimeline = function(data, newOpt)
    {
        var dataTable = {};
        dataTable = new google.visualization.DataTable();
        dataTable.addColumn({ type: 'string', id: 'User' });
        dataTable.addColumn({ type: 'string', id: 'Label' });
        dataTable.addColumn({ type: 'date', id: 'Start' });
        dataTable.addColumn({ type: 'date', id: 'End' });
        var tempData = [];
        data.forEach(function(i){tempData.push(i.slice(0, 4));});
        dataTable.addRows(tempData);

        var options = {
            timeline: { colorByRowLabel: true },
            height: dataTable.getDistinctValues(0).length * 42 + 50
        };
        for (var attrname in newOpt) { options[attrname] = newOpt[attrname]; }
        $scope.ui_o_chart.draw(dataTable, options);
        //hide short place holders
        $("#timeline_chart_user > div > div:nth-child(1) > div > svg > g:nth-child(5) > rect:nth-child(1)").hide();
    };

    //Update timeline model with date bar input and use ShowTimeline to refresh it on the page.
    //Input: optional, int, starting hour in a day
    //       optional, int, ending hour in a day
    $scope.UpdateTimeline = function(param_days, param_start, param_end)
    {
        //login check
        if($scope.user == undefined)
        {
            $scope.ShowMessage("Please login first", true);
            return false;
        }

        //Checking params
        param_days = param_days == undefined ? 1 : param_days;
        param_start = param_start == undefined ? 6 : param_start;
        param_end = param_end == undefined ? 24 * (param_days - 1) + 19 : 24 * (param_days - 1) + param_end;

        $scope.timeOptions = OptionGenerator(param_start, param_end);
        $scope.ui_i_target = undefined;

        //Converting to today's date + time
        var start = new Date($scope.ui_i_date.getTime());
        start.setHours(param_start,0,0,0);
        var end = new Date($scope.ui_i_date.getTime());
        end.setHours(param_end,0,0,0);

        //Get data from server and then update timeline
        $scope.ShowMessage("Updating timeline");
        BackendDataService.GetAllTimesBetweenDatesForUser(start, end, $scope.user.login_id).
        then(function(data) {
            var currentUserSchedule = [[ $scope.user.login_displayname, "", start, start, undefined]];
            currentUserSchedule = currentUserSchedule.concat(data);

            BackendDataService.GetAllTimesBetweenDatesForRole(start, end, $scope.user.login_role == 10 ? 20 : 10).
            then(function(data2){
                $scope.timelineModel.opt = {hAxis: {format: 'MMMM dd HH:mm', minValue: start, maxValue: end}};
                $scope.timelineModel.data = currentUserSchedule.concat(data2);
                $scope.ShowTimeline( $scope.timelineModel.data, $scope.timelineModel.opt);
            });
        });
    };

    //Click handler for Add
    $scope.CommitAddingTime = function(isMeeting)
    {
        //input check
        if($scope.ui_i_start == undefined ||
           $scope.ui_i_end == undefined)
        {
            $scope.ShowMessage("Please select time frames", true);
            return false;
        }
        //login check
        if($scope.user == undefined)
        {
            $scope.ShowMessage("Please login first", true);
            return false;
        }
        //target check
        if(isMeeting && !$scope.ui_i_target)
        {
            $scope.ShowMessage("Please select the target to meet with", true);
            return false;
        }

        var start = new Date($scope.ui_i_date.getTime());
        start.setHours(0,$scope.ui_i_start.offsetInMins,0,0);
        var end = new Date($scope.ui_i_date.getTime());
        end.setHours(0,$scope.ui_i_end.offsetInMins,0,0);

        var AddTimeResultNotify = function(result)
        {
            if(result)
            {
                $scope.ClearInput();
                $scope.ShowMessage("Succeeded adding time", true);
            } else {
                $scope.ShowMessage("Failed adding time", true);
            }
            $scope.UpdateTimeline($scope.ui_i_days);
        }
        if(isMeeting)
            BackendDataService.AddMeetingForUser(start, end, $scope.user.login_id, $scope.ui_i_target.login_id).then(function(data){AddTimeResultNotify(data);});
        else
            BackendDataService.AddFreeTimeForUser(start, end, $scope.user.login_id).then(function(data){AddTimeResultNotify(data);});
    };

    //Click handler for Add
    $scope.CommitRemovingFreeTime = function()
    {
        //input check
        if($scope.ui_i_start == undefined ||
            $scope.ui_i_end == undefined)
        {
            $scope.ShowMessage("Please select time frames", true);
            return false;
        }
        //login check
        if($scope.user == undefined)
        {
            $scope.ShowMessage("Please login first", true);
            return false;
        }

        var start = new Date($scope.ui_i_date.getTime());
        start.setHours(0,$scope.ui_i_start.offsetInMins,0,0);
        var end = new Date($scope.ui_i_date.getTime());
        end.setHours(0,$scope.ui_i_end.offsetInMins,0,0);

        BackendDataService.RemoveFreeTimeForUser(start, end, $scope.user.login_id).then(function(data){
            if(data) {
                $scope.ClearInput();
                $scope.ShowMessage("Succeeded removing free time", true);
            } else {
                $scope.ShowMessage("Failed removing free time", true);
            }
            $scope.UpdateTimeline($scope.ui_i_days);
        })
    };

    $scope.ViewMode = function()
    {
        $scope.inputDisabled = !$scope.inputDisabled;
        if($scope.inputDisabled)
            $scope.ui_i_days = 5;
        else
            $scope.ui_i_days = 1;
        $scope.UpdateTimeline($scope.ui_i_days);
    };

    $scope.ClearInput = function()
    {
        $scope.ui_i_start = undefined;
        $scope.ui_i_end = undefined;
        $scope.ui_i_target = undefined;
    };

    //Click handler for Setup
    $scope.GotoSetup = function()
    {
        $state.go("Setup");
    };
});