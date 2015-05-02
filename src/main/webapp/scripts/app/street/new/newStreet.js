'use strict';

angular.module('drawerApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('newStreet', {
                parent: 'street',
                url: '/streets/new',
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/street/new/newStreet.html',
                        controller: 'NewStreetController'
                    }
                }
            });
    });
