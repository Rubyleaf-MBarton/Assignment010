var app = angular.module('myApp', []);

app.controller('listCtrl',function($scope, $http) {

    $scope.characterData = function() {
        $http.get('/characters').then(function(x) {
            $scope.characters = x.data;
        })
    };
    
    $scope.characterData();

    $scope.addFunction = function() {
        var index = $scope.characters.indexOf($scope.addItem);
        if (index == -1) {
             $scope.characters.push($scope.addItem); 
             $http.post('/characters/' + $scope.addItem).then(function(x) {})
        }
    };
    
        
        
    $scope.removeFunction = function() {
        var index = $scope.characters.indexOf($scope.removeItem);
        if (index != -1) {
            $scope.characters.splice(index, 1);
            $http.delete('/characters/' + $scope.characters).then(function(x){})
        };
    };
    
    $scope.updateInput = function() {
        $scope.newInput = window.prompt('Enter a new name for the character:', this.x)
        if ($scope.newInput != null && $scope.newInput != this.x) {
            $scope.characters[$scope.characters.indexOf(this.x)] = $scope.newInput;
            $http.put('/characters/' + this.x, ($scope.newInput)).then(function(x){});
        }
    }
})

app.controller('searchCtrl',function($scope, $http) {

    $scope.findUser = function() {

        $http.get('/users/' + $scope.id).success(function(x) {
            $scope.result = x;
        })
    }

})