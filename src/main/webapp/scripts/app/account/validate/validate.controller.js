'use strict';

angular.module('drawerApp')
    .controller('ValidateController', function ($scope, $http) {

        $scope.Form = {
            phoneNumber: null
        };

        $scope.sendCode = function () {
            var req = {
                method: 'GET',
                url: '/api/validate/' + $scope.Form.phoneNumber
            };
            $http(req)
                .success(function () {
                    $scope.success = 'OK';
                    $scope.error = null;
                }).error(function () {
                    $scope.success = null;
                    $scope.error = 'ERROR';
                });
        }

    });


