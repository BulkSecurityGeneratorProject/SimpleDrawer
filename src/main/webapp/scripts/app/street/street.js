'use strict';

angular.module('drawerApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('street', {
                abstract: true,
                parent: 'site'
            });
    });
