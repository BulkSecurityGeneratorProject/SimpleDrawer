'use strict';

angular.module('drawerApp')
    .factory('DidoService', function ($http) {
        return {
            findAll: function () {//async
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get('api/didos').then(function (response) {
                    // The then function here is an opportunity to modify the response
                    return response.data;
                });

                return promise;//Return the promise to the controller
            },
            saveDido: function (obj) {
                return $http.post('api/dido/new', obj).then(function (response) {
                    return response.data;
                });
            }
        };
    });
