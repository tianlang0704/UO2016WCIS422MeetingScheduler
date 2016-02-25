/**
 * Created by tracehagan on 2/7/16.
 */
myApp.controller("CheckboxController", function($scope, $state, CharterService, DataService){
    $scope.nodes = [];
    $scope.functions = [];

    $scope.init = function (){
        var names = DataService.getNamesOfNodes(DataService.getData());
        var functions = DataService.getNamesOfData(DataService.getData());
        names.forEach(function(item){
            $scope.nodes.push({name: item, selected: true});
        });
        functions.forEach(function(item){
           $scope.functions.push({name: item, selected: true});
        });
        $scope.graphSelected();
    };

    $scope.nodeClicked =function (node){
      node.selected = node.selected ? false : true;
        //console.log(node);
    };

    $scope.functionClicked = function(func){
        func.selected = func.selected ? false : true;
    };

    $scope.getNames = function(){
        return $scope.nodes;
    };
    $scope.getFunctionNames = function(){
        return $scope.functions;
    };

    $scope.getSelectedNodes = function(){
        return $scope.nodes.filter(function(node){
           return node.selected;
        });
    };
    $scope.getSelectedFunctions = function(){
        return $scope.functions.filter(function(func){
            return func.selected;
        });
    };

    $scope.graphSelected = function(){
        var nodes = $scope.getSelectedNodes();
        var funcs = $scope.getSelectedFunctions();
        var nodeNames = [];
        var funcNames = [];
        for(var i=0; i< nodes.length; i++){
            nodeNames.push(nodes[i].name);
        }
        for(var i=0; i< funcs.length; i++){
            funcNames.push(funcs[i].name);
        }
        CharterService.createChart("#chart", nodeNames, funcNames);
    };

});