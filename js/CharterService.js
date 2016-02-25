myApp.service('CharterService', function(DataService) {
    this.createChart = function (bindto, nodes, functions, barWidth, handleClick, group) {
        if(barWidth==null){
            barWidth = 25;
        }
        if(group == null){
            group = [
                DataService.getNamesOfData(data)
            ];
        }
        var data;
        if(nodes!=null){
            data=DataService.getDataForNodes(nodes);
        }else{
            data=DataService.getData();
        }
        if(functions!=null){
            data = DataService.getDataForFunctions(functions, data);
        }
        console.log(data);
        var chart = c3.generate({
            bindto: bindto,
            size: {
                height: (barWidth * DataService.dataCount(data)) + (DataService.dataCount(data) * 10) + 100
            },
            data: {
                onclick: handleClick,
                x: 'x',
                columns: data,
                type: 'bar',
                groups: group
            },
            axis: {
                rotated: true,
                x: {
                    type: 'category' // this needed to load string x value
                }
            },
            bar: {
                width: barWidth
            }
        });
    }
}
);
