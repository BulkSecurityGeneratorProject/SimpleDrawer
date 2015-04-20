'use strict';

angular.module('drawerApp')
    .factory('Verify', function ($resource) {
        return $resource('api/verify', {}, {
            'get': { method: 'GET', params: {}, isArray: false}
        });
    });


