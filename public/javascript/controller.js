var app = angular.module('myApp', []);

app.controller('listCtrl',function($scope, $http) {

    $scope.characterData = function() {
        $http.get('/characters').then(function(x) {
            for (y=0; y < x.data.length; y++) {
                if (y == 0) {
                    $scope.characters = []
                };
                $scope.characters.push(x.data[y])
            }
        })
    };

    $scope.addFunction = function() {
        var index = $scope.characters.indexOf($scope.addItem);
        if (index == -1) {
             $scope.characters.push($scope.addItem); 
             $http.post('/characters', $scope.characters).then(function(x) {})
        }

        $scope.characterData();
    };
    
        
        
    $scope.removeFunction = function() {
        var index = $scope.characters.indexOf($scope.removeItem);
        if (index != -1) {
            $scope.characters.splice(index, 1);
            $http.post('/characters', $scope.characters).then(function(x){})
        }
        $scope.characterData();
    }
    
    
    $scope.characterData();

})



app.controller('searchCtrl',function($scope, $http) {

    $scope.findUser = function() {

        $http.get('/users/' + $scope.id).success(function(x) {
            $scope.result = x;
        })
    }

})