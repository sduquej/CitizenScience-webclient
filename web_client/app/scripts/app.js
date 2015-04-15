'use strict';

/**
 * @ngdoc overview
 * @name webClientApp
 * @description
 * # webClientApp
 *
 * <p>Main module of the provided sample application</p>
 * <p>Routing is configured for the {@link webClientApp.controller:MainController Main}
 * and {@link webClientApp.controller:ListController List} views.</p>
 *
 * <p>Formly configuration is done, registering the custom fields: <tt>fileField</tt>,
 * <tt>currentLocation</tt> and <tt>mapLocation</tt>. This is done calling the
 * {@link http://docs.angular-formly.com/v5.2.1/docs/custom-templates#creating-a-custom-template
  * formlyConfigProvider.setType()} method. In addition, a
 * {@link http://docs.angular-formly.com/v5.2.1/docs/formlyconfig#templatemanipulators
 * templateManipulator} is used to set the <tt>max</tt> property of inputs of type date to the current date.</p>
 */
angular
  .module('webClientApp', [
    'ngAnimate',
    'ngRoute',
    'ngTouch',
    'formly',
    'formlyBootstrap',
    'angularFileUpload',
    'angularMoment'
  ])
  .config(function ($routeProvider,formlyConfigProvider) {
    // Routing between contribution and statistics page
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController as vm'
      })
      .when('/list', {
        templateUrl: 'views/list.html',
        controller: 'ListController as vm'
      })
      .otherwise({
        redirectTo: '/'
      });

    // Dynamic form fields configuration
    var commonWrappers = ['bootstrapLabel', 'bootstrapHasError'];

    // Register custom types with formly
    // File upload
    formlyConfigProvider.setType({
      name: 'fileField',
      templateUrl: '../views/templates/fileField.html',
      wrapper: commonWrappers
    });

    // Coordinates location type
    formlyConfigProvider.setType({
      name: 'currentLocation',
      templateUrl: '../views/templates/currentLocation.html',
      wrapper: commonWrappers,
      link: function(scope) {
        scope.getLocation = function(){
          navigator.geolocation.getCurrentPosition(function (p) {
            scope.model[scope.options.key] = '(' + p.coords.latitude + ', ' + p.coords.longitude + ')';
            scope.$apply();
          });
        };
      }
    });

    // Map location type
    formlyConfigProvider.setType({
      name: 'mapLocation',
      templateUrl: '../views/templates/mapLocation.html',
      wrapper: commonWrappers,
      link: function(scope) {
        var map,
          locationMarker =  new google.maps.Marker({draggable: true});

        initialize();

        // Initialize google maps component
        function initialize() {
          var mapOptions = {
            zoom: 14
          };

          map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

          locationMarker.setMap(map);

          // Event listener, call selectLocation() when the map is clicked
          google.maps.event.addListener(map, 'click', function(event) {
            selectLocation(event.latLng);
          });

          // Event listener, update the selected location when the marker is dragged
          google.maps.event.addListener(locationMarker, 'dragend', function(event){
            selectLocation(locationMarker.getPosition());
          });

          // Try HTML5 geolocation
          if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var currentLocation = new google.maps.LatLng(position.coords.latitude,
                position.coords.longitude);

              var infowindow = new google.maps.InfoWindow({
                map: map,
                position: currentLocation,
                content: 'You may change the location.'
              });

              //map.setCenter(currentLocation);
              // Update the selected position
              selectLocation(currentLocation);
            }, function() {
              handleNoGeolocation(true);
            });
          } else {
            // Browser doesn't support Geolocation
            handleNoGeolocation(false);
          }
        }

        // Sets the location and centers the map
        function selectLocation(newLocation) {
          locationMarker.setPosition(newLocation);
          map.panTo(newLocation);

          scope.model[scope.options.key] = newLocation.toString();
          scope.$apply();
        }

        function handleNoGeolocation(errorFlag) {
          var defaultLocation = new google.maps.LatLng(53.382814, -6.594513),
            options = {
              map: map,
              position: defaultLocation
            };

          if (errorFlag) {
            options.content = 'Your current location could not be retrieved. Select one on the map';
          } else {
            options.content = 'Your browser doesn\'t support geolocation';
          }

          var infowindow = new google.maps.InfoWindow(options);

          // Update the marker location and center the map on it
          selectLocation(defaultLocation);
        }
      }
    });

    // Restrict date fields max value to the current date
    formlyConfigProvider.templateManipulators.preWrapper.push(function(template, options, scope) {
      var _to = options.templateOptions,
        today = (new Date()).toISOString().slice(0,10);
      if (options.type === 'input' && _to.type === 'date') {
        _to.max = today;
      }
      return template;
    });

  });
