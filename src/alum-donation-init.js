'use strict';

angular.module('AlumDonation', ['ngRoute', 'angular-stripe'])
    .config(['$routeProvider', '$httpProvider', 'stripeProvider', function ($routeProvider, $httpProvider, stripeProvider) {

        $routeProvider.when("/Home", {
            controller: "AlumDonationCtrl",
            templateUrl: "/App/Views/Home.html",
        }).otherwise({
            redirectTo: '/'
        });

       stripeProvider.setPublishableKey('pk_test_2FEIRgkInAlZuEdfQQAyAMEl');

}]);