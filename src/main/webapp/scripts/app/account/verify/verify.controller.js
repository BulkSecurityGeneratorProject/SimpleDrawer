'use strict';

angular.module('drawerApp')
    .controller('VerifyController', function ($scope, $http) {

        $scope.Form = {
            phoneNumber: null,
            verificationCode: null
        };


        $scope.verify = function () {
            if($scope.Form.phoneNumber == null || $scope.Form.verificationCode == null){
                return $scope.errorMsg("Please fill all fields first.");
            }
            var req = {
                method: 'GET',
                url: '/api/verify/' + $scope.Form.phoneNumber + "/" + $scope.Form.verificationCode
            };
            $http(req)
                .success(function () {
                    $scope.success = 'OK';
                    $scope.error = null;
                }).error(function () {
                    $scope.success = null;
                    $scope.error = 'ERROR';
                });
        };

        $scope.errorMsg = function(msg){
            alert(msg);
        };

    });


