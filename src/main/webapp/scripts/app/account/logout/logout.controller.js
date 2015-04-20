'use strict';

angular.module('drawerApp')
    .controller('LogoutController', function (Auth) {
        Auth.logout();
    });
