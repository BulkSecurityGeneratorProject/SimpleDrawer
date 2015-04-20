'use strict';

angular.module('drawerApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


