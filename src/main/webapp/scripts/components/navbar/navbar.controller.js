'use strict';

angular.module('drawerApp')
    .controller('NavbarController', function ($scope, $location, $state) {
        $scope.$state = $state;
    });
