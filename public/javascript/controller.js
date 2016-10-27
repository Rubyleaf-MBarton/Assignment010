var app = angular.module('myApp', []);

app.controller('listCtrl',function($scope, $http) {

    $scope.characterData = function() {
        $http.get('/characters').then(function(x) {
            $scope.characters = x.data;
        })
    };
    
    $scope.characterData(); //initial API call to get list of characters.
    

    $scope.addFunction = function() {
        var index = $scope.characters.indexOf($scope.addItem);
        if (index == -1) {
            $scope.characters.push($scope.addItem);
            $http.post('/characters/' + $scope.addItem);
        }
    };
    
        
        
    $scope.removeFunction = function() {
        var index = $scope.characters.indexOf($scope.removeItem);
        if (index != -1) {
            $scope.characters.splice(index, 1);
            $http.delete('/characters/'+$scope.removeItem).then(function (x) {
                console.log(x.data);
            })
        }
    }
    
    $scope.updateInput = function() {
        $scope.newName = window.prompt("Edit the character's name then click OK to change it.", this.x);
        if ($scope.newName != null && $scope.newName != this.x) {
            $scope.characters[this.$index] = $scope.newName;
            $http.put('/characters/' + this.x, {"data": $scope.newName}).then(function(x){});
        }
    }
});


app.controller('searchCtrl',function($scope, $http) {

    $scope.findUser = function() {

        $http.get('/users/' + $scope.id).success(function(x) {
            $scope.result = x;
        })
    }

})