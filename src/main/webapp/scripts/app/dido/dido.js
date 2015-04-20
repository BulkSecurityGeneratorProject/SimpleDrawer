'use strict';

angular.module('drawerApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('dido', {
                abstract: true,
                parent: 'site'
            });
    });
