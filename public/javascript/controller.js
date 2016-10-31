var app = angular.module('myApp', []);

app.controller('listCtrl',function($scope, $http) {

    $scope.characterData = function() {
        $http.get('/characters').then(function(x) {
            $scope.x = x.data;
            $scope.keys = Object.keys($scope.x);
            $scope.characters = []
            for (i=0; i < $scope.keys.length; i++) {
                $scope.characters.push($scope.x[$scope.keys[i]].name)
            }
        })
    };
    
    $scope.characterData();

    $scope.addFunction = function() {
        var index = $scope.characters.indexOf($scope.addItem);
        if (index == -1) {
             $scope.characters.push($scope.addItem); 
             $http.post('/characters', {"name": $scope.addItem}).then(function(x) {})
        }
    };   
        
    $scope.removeFunction = function() {
        var index = $scope.characters.indexOf($scope.removeItem);
        if (index != -1) {
            $scope.characters.splice(index, 1);
            for (i=0; i < $scope.keys.length; i++) {
                if ($scope.removeItem == $scope.x[$scope.keys[i]].name) {
                    $http.delete('/characters/' + $scope.x[$scope.keys[i]].id).then(function(x){})
                }
            }
        };
    };
    
    $scope.updateInput = function() {
        $scope.newInput = window.prompt('Enter a new name for the character:', this.character)
        if ($scope.newInput != null && $scope.newInput != this.character) {
            $scope.characters[$scope.characters.indexOf(this.character)] = $scope.newInput;
            for (i=0; i < $scope.keys.length; i++) {
                if (this.character == $scope.x[$scope.keys[i]].name) {
                    $http.put('/characters/' + $scope.x[$scope.keys[i]].id, {"data" : $scope.newInput}).then(function(x){});
                }
            }
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


Object.values = function (obj) {
    var vals = [];
    for( var key in obj ) {
        if ( obj.hasOwnProperty(key) ) {
            vals.push(obj[key]);
        }
    }
    return vals;
}