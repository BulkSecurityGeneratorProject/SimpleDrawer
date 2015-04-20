'use strict';

angular.module('drawerApp')
    .controller('FriendsController', function ($rootScope, $scope, FriendService) {
        $scope.friends = null;

        $scope.images = [
            "http://bootdey.com/img/Content/User_for_snippets.png",
            "http://bootdey.com/img/Content/user_1.jpg",
            "http://bootdey.com/img/Content/user_2.jpg"
        ];


        $scope.getAllFriends = function () {
            var counter = 0;
            FriendService.findAll().then(function (r) {
                $scope.friends = r; //returned is a promise, wait for the request to complete and assign didos.
            });
        };

        $scope.getRandomNum = function(){
            return Math.floor( Math.random()*(2));
        };

        $scope.getAllFriends();


    });
