angular.module('AlumDonation')
    .controller('AlumDonationCtrl', ['$scope', '$log', 'AlumDonationSvc', 'stripe', function ($scope, $log, alumDonationService, stripe) {
    
        $scope.pageStep = "stepAmount";
        $scope.cardNumber;
        $scope.expirationMonth;
        $scope.expirationYear;
        $scope.CVC;
        $scope.states = usStates;
        
        stripeResponseHandler = function(status, response){
            $log.log(response);
        };
        
        $scope.next = function(){
            switch($scope.pageStep){
                case "stepAmount":
                    $scope.pageStep = "stepCard";
                    break;
                case "stepCard":
                    $scope.pageStep = "stepAddress";
                    break;
                case "stepAddress":
                    $scope.submit();
            }
        }
        
        $scope.back = function(){
            switch($scope.pageStep){
                case "stepCard":
                    $scope.pageStep = "stepAmount";
                    break;
                case "stepAddress":
                    $scope.pageStep = "stepCard";
            }
        }
        
        
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
       