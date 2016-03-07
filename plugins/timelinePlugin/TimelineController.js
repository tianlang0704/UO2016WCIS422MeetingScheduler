/**
 * Created by CMonk on 3/6/2016.
 */

myApp.controller("TimelineController", function($scope, $state, $cookieStore, BackendDataService){
    //Init is called page finish loading
    $scope.Init = function()
    {
        //Check login
        $scope.user = $cookieStore.get("user");

        //Init chart and data table
        $scope.ui_o_dataTable = {};
        var container = document.getElementById('timeline_chart_user');
        $scope.ui_o_chart = new google.visualization.Timeline(container);

        //Add basic interaction between chart and edits
        //Setting start and end select value when time frame in chart is clicked
        google.visualization.events.addListener($scope.ui_o_chart, 'select', function(){
            var selected = $scope.ui_o_chart.getSelection(); //find selected time
            //find their relative offset in the day in minutes
            var startDate = $scope.ui_o_dataTable.getValue(selected[0].row, 2); //getting start date from 1970 to start
            var endDate = $scope.ui_o_dataTable.getValue(selected[0].row, 3); //getting end date from 1970 to end
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

        //Initialize date
        $scope.ui_i_date = new Date();

        //Update time line for the first time
        $scope.UpdateTimeline();
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
    $scope.prevDay = function()
    {
        $scope.ui_i_date = new Date($scope.ui_i_date.getTime() - 24 * 3600 * 1000);
        $scope.UpdateTimeline();
    };

    //Click handler for date bar button
    $scope.nextDay = function()
    {
        $scope.ui_i_date = new Date($scope.ui_i_date.getTime() + 24 * 3600 * 1000);
        $scope.UpdateTimeline();
    };

    //Show time line with data and options
    $scope.ShowTimeline = function(data, newOpt)
    {
        $scope.ui_o_dataTable = new google.visualization.DataTable();
        $scope.ui_o_dataTable.addColumn({ type: 'string', id: 'Room' });
        $scope.ui_o_dataTable.addColumn({ type: 'string', id: 'Name' });
        $scope.ui_o_dataTable.addColumn({ type: 'date', id: 'Start' });
        $scope.ui_o_dataTable.addColumn({ type: 'date', id: 'End' });
        $scope.ui_o_dataTable.addRows(data);

        var options = {
            timeline: { colorByRowLabel: true }
        };
        for (var attrname in newOpt) { options[attrname] = newOpt[attrname]; }
        $scope.ui_o_chart.draw($scope.ui_o_dataTable, options);
        //hide short place holders
        (function(){                                            //anonymous self calling function to prevent variable name conficts
            var container = document.getElementById("timeline_chart_user");
            var el=container.getElementsByTagName("rect");      //get all the descendant rect element inside the container
            var width=3;                                //set a large initial value to width
            var elToRem=[];                                     //element would be added to this array for removal
            for(var i=0;i<el.length;i++){                           //looping over all the rect element of container
                var cwidth=parseInt(el[i].getAttribute("width"));//getting the width of ith element
                if(cwidth<width){                               //if current element width is less than previous width then this is min. width and ith element should be removed
                    elToRem=[el[i]];
                    width=cwidth;                               //setting the width with min width
                }
                else if(cwidth==width){                         //if current element width is equal to previous width then more that one element would be removed
                    elToRem.push(el[i]);
                }
            }
            for(var i=0;i<elToRem.length;i++) // now iterate JUST the elements to remove
                elToRem[i].setAttribute("fill","none"); //make invisible all the rect element which has minimum width
        })();
    };

    //Update timeline model with date bar input and use ShowTimeLine to refresh it on the page.
    //Input: optional, int, starting hour in a day
    //       optional, int, ending hour in a day
    $scope.UpdateTimeline = function(param_start, param_end)
    {
        //login check
        if($scope.user == undefined)
        {
            $scope.ShowMessage("Please login first", true);
            return false;
        }

        //Checking params
        param_start = param_start == undefined ? 6 : param_start;
        param_end = param_end == undefined ? 19 : param_end;
        $scope.timeOptions = OptionGenerator(param_start, param_end);

        //Converting to todays date + time
        var start = new Date($scope.ui_i_date.getTime());
        start.setHours(param_start,0,0,0);
        var end = new Date($scope.ui_i_date.getTime());
        end.setHours(param_end,0,0,0);

        //Get data from server and then update timeline
        $scope.ShowMessage("Updating timeline");
        BackendDataService.GetAllTimesBetweenDatesForUser(start, end, $scope.user.login_id).
        then(function(data)
        {
            $scope.timelineModel = {};
            $scope.timelineModel.opt = {
                hAxis: {
                    format: 'HH:mm',
                    minValue: start,
                    maxValue: end
                    //, viewWindow:{min: start, max: end}
                }};
            if(data.length > 0)
                $scope.timelineModel.data = data;
            else
                $scope.timelineModel.data = [[ $scope.user.login_displayname, "", start, start]];;

            $scope.ShowTimeline( $scope.timelineModel.data, $scope.timelineModel.opt);
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

        var start = new Date($scope.ui_i_date.getTime());
        start.setHours(0,$scope.ui_i_start.offsetInMins,0,0);
        var end = new Date($scope.ui_i_date.getTime());
        end.setHours(0,$scope.ui_i_end.offsetInMins,0,0);

        var AddTimeNotify = function(result)
        {
            if(result)
                $scope.ShowMessage("Succeeded adding time", true);
            else
                $scope.ShowMessage("Failed adding time", true);
            $scope.UpdateTimeline();
        }
        if(isMeeting)
            BackendDataService.AddMeetingForUser(start, end, $scope.user.login_id).then(function(data){AddTimeNotify(data);});
        else
            BackendDataService.AddFreeTimeForUser(start, end, $scope.user.login_id).then(function(data){AddTimeNotify(data);});
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
            if(data)
                $scope.ShowMessage("Succeeded removing free time", true);
            else
                $scope.ShowMessage("Failed removing free time", true);
            $scope.UpdateTimeline();
        })
    };

    //Click handler for Setup
    $scope.Setup = function()
    {
        $state.go("Setup");
    };
});