'use strict';

angular.module('drawerApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('tools', {
                abstract: true,
                parent: 'site'
            });
    });
