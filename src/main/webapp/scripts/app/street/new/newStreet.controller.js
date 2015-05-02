'use strict';

angular.module('drawerApp')
    .controller('NewStreetController', function ($scope, $http) {
        $scope.direction = null;
        $scope.Street = {};
        $scope.Street.id = 512512512; //random, not needed

        $scope.setDirection = function (d) {
            $scope.Street.direction = d;
        };


        $scope.save = function () {

            $http.post('/api/street/', $scope.Street)
                .success(function (data, status, headers, config) {
                    // this isn't happening:
                    console.debug("saved comment", $scope.Street.name);
                    alert("Saved!");
                })  //<-- damn ")"
                .error(function (data, status, headers, config) {
                    // this isn't happening:
                    console.debug("saved comment", $scope.Street.name);
                })
        }
    });
