'use strict';

angular.module('drawerApp')
    .controller('ListStreetsController', function ($scope, $http,$log) {

        $scope.streets = null;
        $scope.findAll = function () {
            $scope.streets = null;
            $http.get('/api/streets/')
                .success(function (data, status, headers, config) {
                    // this isn't happening:
                    $scope.streets = data;
                })  //<-- damn ")"
                .error(function (data, status, headers, config) {
                    // this isn't happening:
                })
        };

        $scope.delete = function(id){
            $http.delete('/api/street/' + id)
                .success(function (data, status, headers, config) {
                    // this isn't happening:
                    alert("Deleted!");
                    $scope.findAll();
                })  //<-- damn ")"
                .error(function (data, status, headers, config) {
                    // this isn't happening:
                })
        }

        $scope.findAll();
    });
