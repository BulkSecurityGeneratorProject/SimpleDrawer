'use strict';

angular.module('drawerApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('locationFinder', {
                parent: 'site',
                url: '/locationFinder',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'Location Finder'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/account/locationFinder/locationFinder.html',
                        controller: 'LocationFinderController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('locationFinder');
                        return $translate.refresh();
                    }]
                }
            });
    });

