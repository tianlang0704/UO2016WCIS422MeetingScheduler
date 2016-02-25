/**
 * Created by tracehagan on 2/7/16.
 */
function CreateBarCharter(){
    var obj = {};
    obj.createChart = function(bindto){
        var chart = c3.generate({
            bindto: bindto,
            data: {
                columns: [
                    ['data1', -30, 200, 200, 400, -150, 250],
                    ['data2', 130, 100, -100, 200, -150, 50],
                    ['data3', -230, 200, 200, -300, 250, 250]
                ],
                type: 'bar',
                groups: [
                    ['data1', 'data2', 'data3']
                ]
            },
            grid: {
                y: {
                    lines: [{value:0}]
                }
            }
        });
    }
    return obj;
}