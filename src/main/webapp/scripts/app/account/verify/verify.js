'use strict';

angular.module('drawerApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('verify', {
                parent: 'account',
                url: '/verify',
                data: {
                    roles: [],
                    pageTitle: 'verify.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/account/verify/verify.html',
                        controller: 'VerifyController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('verify');
                        return $translate.refresh();
                    }]
                }
            });
    });

