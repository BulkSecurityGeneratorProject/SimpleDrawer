'use strict';

angular.module('drawerApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('didoViewer', {
                parent: 'dido',
                url: '/didoViewer',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'Dido Viewer'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/dido/didoViewer/didoViewer.html',
                        controller: 'DidoViewerController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('didoViewer');
                        return $translate.refresh();
                    }]
                }
            });
    });

