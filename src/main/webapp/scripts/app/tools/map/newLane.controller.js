'use strict';

angular.module('drawerApp')
    .controller('NewLaneController', function ($scope, $log) {
        $scope.loadingMap = false;//flag used for loading the map
        var BASE_ICON_PATH = "/assets/icons/";
        $scope.iconMap = ["yellow_icon.png",
            "purple_icon.png", "red_icon.png", "yellow_icon.png"];

        $scope.laneLength = 1;

        /**
         * All Event listeners for markers on the primary google map.
         * @type {{click: Function}}
         */
        $scope.markerEvents = {
            //marker Events
            click: function (marker, eventName, args) {
                var title = marker.model.title;
                alert(title);
            }
        }; //Marker Only Events

        /**
         * All Event listeners for the primary google map.
         * @type {{click: Function}}
         */
        $scope.mapEvents = {
            click: function (mapModel, eventName, originalEventArgs) {
                var e = originalEventArgs[0];
                var lat = e.latLng.k;
                var log = e.latLng.D;
                var msg = "Geopoint: [" + lat + ", " + log + "]";
                $scope.pushMarker(lat, log, msg, $scope.laneLength++);
            }
        }; //Map Only Events

        $scope.getIconPng = function(id){
            $log.info("getting icon for id: " + id);
            if(id == 1){
                return BASE_ICON_PATH + $scope.iconMap[0];
            }else{
                return BASE_ICON_PATH + $scope.iconMap[2];
            }
        };


        $scope.pushMarker = function (lat, lng, title, id) {
            $log.info("Pushing Marker to map with coords: [" + lat + ", " + lng + "]");
            var m = {
                idKey: id,
                coords: {
                    latitude: lat,
                    longitude: lng
                },
                title: title,
                events: $scope.markerEvents,
                options: {
                    icon: {
                        url: $scope.getIconPng(id)
                    },
                    draggable: true
                }
            };
            $scope.markers.push(m);
        };
        $scope.markers = [];

        $scope.reDrawMap = function(){
            $scope.map = {
                center: {
                    latitude: 40.1451,
                    longitude: -99.6680
                },
                zoom: 4,
                events: $scope.mapEvents,
                markers: $scope.markers
            };

            $scope.options = {
                scrollwheel: true
            };
        };

        $scope.reDrawMap();

    });
