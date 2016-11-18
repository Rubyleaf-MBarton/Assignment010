var app = angular.module('myApp', []);

app.controller('listCtrl',function($scope, $http) {

    $scope.characterData = function() {
        $http.get('/characters').then(function(x) {
            $scope.x = x.data;
            $scope.keys = Object.keys($scope.x);
            console.log($scope.keys);
            $scope.characters = [];
            $scope.x.forEach(function(object){
                $scope.characters.push(object.name);
            });
        });
    };
    
    $scope.characterData();
    
    $scope.addFunction = function() {
        var index = $scope.characters.indexOf($scope.addItem);
        if (index == -1) {
             $scope.characters.push($scope.addItem); 
             $http.post('/characters', {"name": $scope.addItem}).then(function(x) {});
        }
    };   


    $scope.removeFunction = function() {
        var index = $scope.characters.indexOf($scope.removeItem);
        if (index != -1) {
            $scope.characters.splice(index, 1);
            $http.delete('/characters/' + $scope.x[index]._id, function(x){});
            $scope.x.splice(index, 1);
            console.log($scope.x);
        }
    };
    
    $scope.updateInput = function() {
        $scope.newInput = window.prompt('Enter a new name for the character:', this.character);
        if ($scope.newInput != null && $scope.newInput != this.character) {
            $scope.characters[$scope.characters.indexOf(this.character)] = $scope.newInput;
            for (i=0; i < $scope.characters.length; i++) {
                if (this.character == $scope.x[$scope.keys[i]].name) {
                    $http.put('/characters/' + $scope.x[i]._id, {"name" : $scope.newInput}).then(function(x){});
                }
            }
        }
    };
});
