angular.module('AlumDonation')
    .controller('AlumDonationCtrl', ['$scope', '$log', 'AlumDonationSvc', 'stripe', function ($scope, $log, alumDonationService, stripe) {
    
        $scope.cardNumber;
        $scope.expirationMonth;
        $scope.expirationYear;
        $scope.CVC;
        

        stripeResponseHandler = function(status, response){
            $log.log(response);
        };
        
        $scope.submit = function(){
            $log.log("submitting");
            Stripe.card.createToken ({
                number: $scope.cardNumber,
                cvc: $scope.cvc,
                exp_month: $scope.expirationMonth,
                exp_year: $scope.expirationYear 
            }, stripeResponseHandler);
        };

    }]);
       