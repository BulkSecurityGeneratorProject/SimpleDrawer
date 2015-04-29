'use strict';

angular.module('drawerApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('newLane', {
                parent: 'tools',
                url: '/tools/map/lane/new',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/tools/map/newLane.html',
                        controller: 'NewLaneController'
                    }
                }
            });
    });
