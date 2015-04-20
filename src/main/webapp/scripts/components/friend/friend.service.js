'use strict';

angular.module('drawerApp')
    .factory('FriendService', function ($http) {
        return {
            findAll: function () {//async
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get('api/user/friends').then(function (response) {
                    // The then function here is an opportunity to modify the response
                    return response.data;
                });

                return promise;//Return the promise to the controller
            }
        };
    });
