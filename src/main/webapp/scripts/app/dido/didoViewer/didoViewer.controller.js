'use strict';
angular.module('drawerApp')
    .controller('DidoViewerController', function ($scope, DidoService, $modal) {

        $scope.counter = 0;

        /**
         * All Event listeners for markers on the primary google map.
         * @type {{click: Function}}
         */
        $scope.markerEvents = {
            //marker Events
            click: function (marker, eventName, args) {
                var title = marker.model.title;
                if(!(title)){
                    title = "N/A";
                }
                alert(title);
            }
        }; //Marker Events

        /**
         * All Event listeners for the primary google map.
         * @type {{click: Function}}
         */
        $scope.mapEvents = {
            click: function (mapModel, eventName, originalEventArgs) {
                var e = originalEventArgs[0];
                var lat = e.latLng.k;
                var log = e.latLng.D;
                if(confirm("Are you sure you want to add a dido at [" + lat + ", " + log + "]")){
                    $scope.save("Testing!", lat, log);
                }
            }
        }; //Map Events

        $scope.getRandomMarkerPng = function(){
            var images = ["alligator.png", "animal-shelter-export.png", "ant-export.png",
                "bats.png", "bear.png", "bee.png"];

            if($scope.counter > 5){
                $scope.counter = 0;
            }
            $scope.counter++;
            return "/assets/images/icons/" + images[$scope.counter];
        };

        $scope.getIconPng = function(id){
            if(!(id)){
                return "api/media/download/" + 1620;
            }
            return "api/media/download/" + id;
        };


        $scope.didos = []; //Simple Array representing all didos
        $scope.map = {
            center: {
                latitude: 40.1451,
                longitude: -99.6680
            },
            zoom: 4,
            events: $scope.mapEvents
        };

        $scope.options = {
            scrollwheel: true
        };

        $scope.markers = [];

        $scope.markerOptions = {
            size: new google.maps.Size(1,1)
        };

        $scope.pushMarker = function (lat, lng, title, id, markerId) {
            console.log("Pushing Marker to map with coords: [" + lat + ", " + lng + "]");
            $scope.markers.push({
                idKey: id,
                coords: {
                    latitude: lat,
                    longitude: lng
                },
                title: title,
                events: $scope.markerEvents,
                icon: $scope.getIconPng(markerId),
                size: $scope.markerOptions,
                options: $scope.markerOptions
            });
        };

        $scope.fetchDidos = function () {
            DidoService.findAll().then(function (r) {
                $scope.didos = r; //returned is a promise, wait for the request to complete and assign didos.
                $scope.showDidos();
            });
        };

        $scope.showDidos = function () {
            var counter = 0;
            for (var i in $scope.didos) {
                counter++;
                console.log("Pushing Dido: " + $scope.didos[i].lat);
                var dido = $scope.didos[i];
                $scope.pushMarker(dido.latitude, $scope.didos[i].longitude, dido.msg, counter, dido.icon);
            }
        };

        $scope.save = function(msg, lat, lng){
            var didoObj = {
                "msg": msg,
                "latitude": lat,
                "longitude": lng
            };

            DidoService.saveDido(didoObj).then(function (r){
                alert("Saved!");
            });
            $scope.fetchDidos();
        };

        //Initialize scope.
        $scope.fetchDidos();
    });



