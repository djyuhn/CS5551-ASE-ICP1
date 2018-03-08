'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [])


    .controller('View1Ctrl', function ($scope, $http) {
        $scope.getDate = function () {
            var monthEntered = document.getElementById("txt_month").value;
            var dayEntered = document.getElementById("txt_day").value;
            var output = document.getElementById("txt_output").value;
            if (monthEntered != null && monthEntered!= "" && dayEntered != null && dayEntered != "") {
                //This is the API that gives the list of venues based on the place and search query.
                var handler = $http.get("http://numbersapi.com/" + monthEntered + "/" + dayEntered + "/" +
                    "/date?json");
                handler.success(function (data) {

                    if (data != null && data.text != null) {
                        document.getElementById("txt_output").innerHTML = data.text;
                    }

                });
                handler.error(function (data) {
                    alert("There was some error processing your request. Please try after some time.");
                });
            }
        };
    });
