/**
 * Created by sduquej on 10/02/2015.
 */
angular.module('simpleForm.controllers',['simpleForm.services'])
    .controller('SimpleCtrl', function($rootScope, $scope, API, $window){
        $scope.user = {
            email: "",
            first_name: "",
            last_name: "",
            age: 18,
            gender: ""
        };

        $scope.createUser = function(){
            var email = this.user.email;
            var fname = this.user.first_name;
            var lname = this.user.last_name;
            var age = this.user.age;
            var gender = this.user.gender || "U";
            if(!email || !fname || !lname || !age){
                alert("Missing data, please enter valid inputs");
                $rootScope.notify("Missing data, please enter valid inputs");
                return false;
            }

            $rootScope.show("Please wait… Saving");
            API.form({
                email: email,
                first_name: fname,
                last_name: lname,
                age: age,
                gender: gender
            }).success(function (data){
                alert("Data collected :D");
                $rootScope.hide();
                //$rootScope.notify("Data successfully collected");
                $window.location.href = ('#auth/form');
            }).error(function (error) {
                $rootScope.hide();
                if(error.error && error.error.code == 11000){
                    $rootScope.notify("This email is duplicated");
                    alert("Duplicated email");
                } else {
                    alert("Something unexpected happened. See logs or try again");
                    $rootScope.notify("Something unexpected happened. See logs or try again");
                    console.log("ERROR >"+error.error);
                }
            });
        }
    })