'use strict';

angular.module('drawerApp')
    .factory('LocationTracker', function ($rootScope) {
        var stompClient = null;

        function sendLocation(location) {
            stompClient
                .send('/websocket/location',
                {},
                JSON.stringify({'location': location }));
        }
        return {
            connect: function (location) {
                var socket = new SockJS('/websocket/location');
                stompClient = Stomp.over(socket);
                stompClient.connect({}, function(frame) {
                    sendLocation(location);
                });
            },
            sendLocation: function (location) {
                if (stompClient != null) {
                    sendLocation(location);
                }
            },
            disconnect: function() {
                if (stompClient != null) {
                    stompClient.disconnect();
                    stompClient == null;
                }
            }
        };
    });
