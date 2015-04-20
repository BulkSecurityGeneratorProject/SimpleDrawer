'use strict';

angular.module('drawerApp')
    .controller('RegisterController', function ($scope, $translate, $timeout, Auth, $http) {
        $scope.validateFlow = true; //1. Validate a phone number by sending SMS verification code
        $scope.verifyFlow = null;  //2. Check if the user can enter the correct verification code
        $scope.registerFlow = null; //3. Create a new user
        $scope.successMsg = null;
        $scope.errorMsg = null;
        $scope.doNotMatch = null;
        $scope.errorUserExists = null;
        $scope.registerAccount = {};
        $scope.registerAccount.langKey = "en";

        $scope.titles = {
            validate: "Validate Phone Number",
            verify: "Verify Phone Number",
            register: "Register a New Account"
        };

        $scope.FlowTitle = $scope.titles.validate;

        $scope.alertMsg = function (msg) {
            alert(msg);
        };

        //Validate Phone Number Flow - sends a user a SMS code to ensure the phone number can be validated before registration
        $scope.ValidateForm = {
            phoneNumber: null
        };

        $scope.sendCode = function () {
            var req = {
                method: 'GET',
                url: 'api/validate/' + $scope.ValidateForm.phoneNumber
            };
            $http(req)
                .success(function () {
                    $scope.successMsg = 'A verification Key has been sent to your account, please enter it below.';
                    $scope.errorMsg = null;
                    $scope.validateFlow = false;
                    $scope.verifyFlow = true;
                }).error(function () {
                    $scope.successMsg = null;
                    $scope.errorMsg = 'Unable to send verification key, please try later.';
                });
        };


        //Verify Phone Number Flow - Responsible for ensuring the user enters the correct SMS code that was sent
        $scope.VerifyForm = {
            phoneNumber: null,
            verificationCode: null
        };


        $scope.verify = function () {
            if ($scope.VerifyForm.phoneNumber == null || $scope.VerifyForm.verificationCode == null) {
                return $scope.alertMsg("Please fill all fields first.");
            }
            var req = {
                method: 'GET',
                url: 'api/verify/' + $scope.VerifyForm.phoneNumber + "/" + $scope.VerifyForm.verificationCode
            };
            $http(req)
                .success(function () {
                    $scope.successMsg = 'Verified! Please register below to access Dido!';
                    $scope.errorMsg = null;
                    $scope.verifyFlow = false;
                    $scope.registerFlow = true;
                    $scope.registerAccount.phoneNumber = $scope.VerifyForm.phoneNumber; //pass on phone number to next flow
                }).error(function () {
                    $scope.successMsg = null;
                    $scope.errorMsg = 'Unable to verify the key entered, please try again.';
                });
        };
        //RegisterFlow - responsible for registering a new user after he/she has validated and verified their phone number
        $scope.checkUserAvailability = function(login){

        };

        $timeout(function () {
            angular.element('[ng-model="registerAccount.login"]').focus();
        });

        $scope.register = function () {
            $scope.registerAccount.langKey = $translate.use(); //'en' by default
            $scope.doNotMatch = null;
            $scope.error = null;
            $scope.errorUserExists = null;
            $scope.errorEmailExists = null;
            console.log($scope.registerAccount);
            Auth.createAccount($scope.registerAccount).then(function () {
                $scope.errorMsg = null;
                $scope.successMsg = 'Created! Welcome to Dido!';
            }).catch(function (response) {
                $scope.success = null;
                if (response.status === 400 && response.data === 'login already in use') {
                    $scope.successMsg = null;
                    $scope.errorMsg = 'Username already exists, please choose another.';
                }
                else if (response.status === 400 && response.data === 'phone number already registered') {
                    $scope.successMsg = null;
                    $scope.errorMsg = 'Phone number already registered to an account.';
                }else {
                    $scope.successMsg = null;
                    $scope.errorMsg = 'Unable to register you, uh oh!';
                }
            });
        };
    });
