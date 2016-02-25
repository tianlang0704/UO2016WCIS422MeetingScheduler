myApp.service('DataService', function(){
    // [
    //   ['x', 'NodeName1', 'NodeName2', 'NodeName3', 'etc' ],
    //   ['functionName1', node1Val, node2Val, node3Val, etc],
    //   ['functionName2', node1Val, node2Val, node3Val, etc]
    // ]
    this.getData = function () {

        return [
            ['x', 'Node1', 'Node2', 'Node3', 'Node4', 'Node5', 'Node6', 'Node7', 'Node8', 'Node9', 'Node10', 'Node11', 'Node12', 'Node13', 'Node14', 'Node15', 'Node16'],
            ['function1', 30, 200, 200, 400, 150, 250, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            ['function2', 130, 100, 100, 200, 150, 50, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            ['function3', 230, 200, 200, 300, 250, 250, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            ['function4', 100, 200, 300, 400, 500, 600, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
        ];
    };

    this.getNamesOfData=function(data){
        var names = [];
        data.forEach(function(item){

            if(item[0]!== 'x') {
                names.push(item[0]);
            }
        });
        return names;
    };

    this.getDataForSingleNode = function(name){
        var index = -1;
        var dataToReturn = [];
        var nodeNamesRow = [];
        nodeNamesRow = this.getData()[0];
        nodeNamesRow.forEach(function(item, dex){
           if(item==name) {
               index = dex;
           }
        });
        //okay we have the index, lets group the data up
        this.getData().forEach(function(item){
           dataToReturn.push([item[0],item[index]]);
        });
        return dataToReturn;
    };

    this.getDataForNodes = function(names){
        var indexes = [];
        var dataToReturn = [];
        var nodeNamesRow = [];
        nodeNamesRow = this.getData()[0];
        nodeNamesRow.forEach(function(item, dex){
            names.forEach(function(name){
                if(item==name){
                    indexes.push(dex);
                }
            })

        });
        //okay we have the indexes, lets group the data up
        this.getData().forEach(function(item){
            var row = [item[0]];
            item.forEach(function(arg, index){
                if($.inArray(index, indexes)!==-1) {
                    row.push(arg);
                }
            });
            dataToReturn.push(row);
        });
        return dataToReturn;
    };

    this.getDataForFunctions = function(names, data){
        var allData = data;
        var returnData = [];
        returnData.push(data[0]);
        allData.forEach(function(row){
            if($.inArray(row[0], names)!== -1){
                returnData.push(row);
            }
        });
        return returnData;
    };

    this.getNamesOfNodes = function(data){
      var returnMe = [];
        var names = data[0];
        var i;
        for(i=1; i < names.length; i++){
            returnMe.push(names[i]);
        }
        return returnMe;
    };

    this.dataCount = function(data){
      var firstLine = data[0];
        return firstLine.length - 1;
    };

});
