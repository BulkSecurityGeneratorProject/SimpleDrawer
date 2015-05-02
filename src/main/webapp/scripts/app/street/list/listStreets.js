'use strict';

angular.module('drawerApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('listStreets', {
                parent: 'street',
                url: '/streets/list',
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/street/list/listStreets.html',
                        controller: 'ListStreetsController'
                    }
                }
            });
    });
