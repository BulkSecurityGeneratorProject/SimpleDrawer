'use strict';

angular.module('drawerApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('friends', {
                parent: 'account',
                url: '/friends',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'friends.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/account/friends/friends.html',
                        controller: 'FriendsController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('friends');
                        return $translate.refresh();
                    }]
                }
            });
    });
