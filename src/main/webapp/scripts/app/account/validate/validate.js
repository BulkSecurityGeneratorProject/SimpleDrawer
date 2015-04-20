'use strict';

angular.module('drawerApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('validate', {
                parent: 'account',
                url: '/validate',
                data: {
                    roles: [],
                    pageTitle: 'validate.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/account/validate/validate.html',
                        controller: 'ValidateController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('validate');
                        return $translate.refresh();
                    }]
                }
            });
    });

