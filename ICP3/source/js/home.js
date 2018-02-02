var appID = "YOUR EDAMAM ID"; // edamam ID
var appKey = "YOUR EDAMAM KEY"; // edamam key
var watUser = "YOUR WATSON USER"; // Watson User
var watPass = "YOUR WATSON PASSWORD"; // Watson Password

var myapp = angular.module( 'homeModule', ['googleOauth'] );

myapp.config( function (TokenProvider) {
    // Demo configuration for the "angular-oauth demo" project on Google.
    // Log in at will!

    // Sorry about this way of getting a relative URL, powers that be.

    var baseUrl = document.URL.replace( '/home.html', '' );
    TokenProvider.extendConfig( {
        clientId: '202317690708-062ts2disvkoi7lfm6strp08updu3n45.apps.googleusercontent.com',
        redirectUri: baseUrl + '/home.html',  // allow lunching demo from a mirror
        scopes: ["https://www.googleapis.com/auth/userinfo.email"]
    } );
} );

myapp.controller( 'homeController', function ($scope, $http,$rootScope,$log, $window, Token,$http,$location) {
    $scope.accessToken = Token.get()
    //  https://api.edamam.com/diet?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=gte%20591,%20lte%20722&health=alcohol-free
    $scope.findFood = function () {
        //var end = document.getElementById('endlocation').value;
        $http.get( 'https://api.edamam.com/api/nutrition-data?&app_id=' +
            appID + '&app_key=' + appKey + '&ingr=' + encodeURI($scope.food)).success( function (data1) {
            console.log( data1 );

            document.getElementById("calories").innerHTML = data1.calories;
            document.getElementById("weight").innerHTML = data1.totalWeight;
        } )

    };

    $scope.sayWatson = function () {
        window.location = 'https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize?username=' + watUser + '&password=' + watPass + '&text=' + $scope.food
    };

    $rootScope.updateSession = function () {
        //reads the session variables if exist from php
        $rootScope.session = "hello";

    };

    $rootScope.updateSession();

} );


