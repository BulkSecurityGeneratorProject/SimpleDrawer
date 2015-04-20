'use strict';

angular.module('drawerApp')
    .controller('LocationFinderController', function ($scope, LocationTracker) {

        $scope.map = {
            center: {latitude: 43.67023, longitude: -79.38676},
            zoom: 12,
            events: null,
            polygons: $scope.polygons,
            circles: null
        };


        $scope.lines = [
            {"latitude": 43.672523, "longitude": -79.38876}
        ];

        $scope.userTrack = [
            {"latitude": 43.672523, "longitude": -79.38876},
            {"latitude": 43.67623, "longitude": -79.388246}
        ];


        $scope.drawPolyline = function () {
            $scope.polylines = [
                {
                    id: 1,
                    path: $scope.lines,
                    stroke: {
                        color: '#6060FB',
                        weight: 6
                    },
                    editable: false,
                    draggable: false,
                    geodesic: true,
                    visible: true,
                    clickable: true,
                    fit: true
                }
            ];
        };


        $scope.drawUserTrack = function () {
            console.log("Drawing user Track...");
            $scope.polylines2 = [
                {
                    id: 1,
                    path: $scope.userTrack,
                    stroke: {
                        color: '#60655',
                        weight: 3
                    },
                    editable: false,
                    draggable: false,
                    geodesic: true,
                    visible: true,
                    clickable: true,
                    fit: true
                }
            ];
        };

        $scope.drawPolyline();
        $scope.drawUserTrack();
        $scope.lastLat = 43.67023;
        $scope.lastLng = -79.38676;
        //Random Point generator
        $scope.autoGeneratePoints = function () {

            var directionOffSet = Math.random() >= 0.2; //Random generator for direction

            var latOffSet = (Math.random() * (0.0120 - 0.00200) + 0.00200).toFixed(6); //Generate random 6 decimal Latitude
            var lngOffSet = (Math.random() * (0.0120 - 0.00200) + 0.00200).toFixed(6); //Generate random 6 decimal Longitude

            console.log("Lat offset: " + latOffSet + " Long offset: " + lngOffSet);


            if (directionOffSet) {
                var lat = Number($scope.lastLat) + Number(latOffSet);
                var lng = Number($scope.lastLng) + Number(lngOffSet);
            } else {
                var lat = Number($scope.lastLat) - Number(latOffSet);
                var lng = Number($scope.lastLng) - Number(lngOffSet);
            }

            var point = {"latitude": lat, "longitude": lng};

            //To avoid loop iteration
            $scope.lastLat = lat;
            $scope.lastLng = lng;

            $scope.lines.push(point); //Add to points
            $scope.drawPolyline(); //Connect points

        };

        $scope.addPoint = function () {
            $scope.autoGeneratePoints();
            $scope.broadcastLocation();
        };

        // This controller uses a Web Socket connection to receive user locations in real-time.
        //Send Location to socket

        LocationTracker.connect(); //Connect to Topic

        /**
         * Broad Cast Location through socket to all subscribers
         */
        $scope.broadcastLocation = function () {
            var location = {
                "latitude": $scope.lastLat.toFixed(4),
                "longitude": $scope.lastLng.toFixed(4)
            };
            LocationTracker.sendLocation(location); //send to websocket
        };

        //Get other User's Locations from server
        $scope.locations = [];
        var stompClient = null;
        var socket = new SockJS('/websocket/locationTracker');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            stompClient.subscribe('/topic/location', function (location) {
                showLocation(JSON.parse(location.body));
                $scope.push(location.body.location);
            });
        });

        function showLocation(location) {
            var existingLocation = false;
            for (var index = 0; index < $scope.locations.length; index++) {
                if ($scope.locations[index].sessionId == location.sessionId) {
                    existingLocation = true;
                    $scope.locations[index] = location;
                }
            }
            if (!existingLocation) {
                $scope.push(location);
                console.log("pushing to locations...");
            }
            console.log("User pushed to topic with location: " + location.location);

            $scope.$apply();
        };

        $scope.$watch('locations', function () {
            $scope.drawUserTrack();
        });

        $scope.push = function (location) {
            if (location != null) {
                $scope.locations.push(location);
                $scope.userTrack.push(location);
                console.log("Length of user track: " + $scope.userTrack.length);
                $scope.drawUserTrack();

            }
        }

    });



