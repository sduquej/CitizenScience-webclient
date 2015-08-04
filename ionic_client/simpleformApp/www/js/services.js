/**
 * Created by sduquej on 10/02/2015.
 */
angular.module('simpleForm.services',[])
    .factory('API', function ($rootScope, $http, $ionicLoading, $window) {
        var base = "http://localhost:9804";
        $rootScope.show = function (text) {
            $rootScope.loading = $ionicLoading.show({
                content: text ? text : 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        };

        $rootScope.hide = function () {
            $ionicLoading.hide();
        };

        $rootScope.notify =function(text){
            $rootScope.show(text);
            $window.setTimeout(function () {
                $rootScope.hide();
            }, 1999);
        };

        return {
            form: function (form) {
                return $http.post(base+'/api/v1/simpleForm/register', form);
            }
        }
    });
