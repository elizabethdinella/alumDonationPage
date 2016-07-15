angular.module('AlumDonation')
    .controller('AlumDonationCtrl', ['$scope', '$log', 'AlumDonationSvc', 'stripe', function ($scope, $log, alumDonationService, stripe) {
    
        $scope.pageStep = "stepAmount";
        
        //amountStep
        $scope.amount;
        $scope.amountValid;
        
        //cardStep
        $scope.cardNumber;
        $scope.cardValid;
        $scope.expirationDate;
        $scope.expValid;
        $scope.CVC;
        $scope.cvcValid;
        
        //addressStep 
        $scope.name;
        $scope.nameValid;
        $scope.addressOne;
        $scope.addressValid;
        $scope.addressTwo;
        $scope.city;
        $scope.cityValid;
        $scope.state;
        $scope.stateValid;
        $scope.states = usStates;
        $scope.zipcode;
        $scope.zipValid;
        
        stripeResponseHandler = function(status, response){
            $log.log(response);
        };
        
        
        $scope.validate = function(){
            switch($scope.pageStep){
                case "stepAmount":
                    $scope.amountValid = getValidateClass($scope.amount && $scope.amount>0);
                    return $scope.amountValid == true;
                case "stepCard":
                    $scope.cardValid = 
                    getValidateClass(Stripe.card.validateCardNumber($scope.cardNumber));
                    $scope.expValid = getValidateClass($scope.expirationDate && Stripe.card.validateExpiry($scope.expirationDate.getMonth()+1, $scope.expirationDate.getFullYear()));
                    $scope.cvcValid = getValidateClass(Stripe.card.validateCVC($scope.CVC));
                    return $scope.cardValid == true && $scope.expValid == true && $scope.cvcValid == true;
                case "stepAddress":
                    $scope.nameValid = getValidateClass($scope.name);
                    $scope.addressValid = getValidateClass($scope.address);
                    $scope.cityValid = getValidateClass($scope.city);
                    $scope.stateValid = getValidateClass($scope.state);
                    $scope.zipValid = getValidateClass($scope.zipcode && $scope.zipcode.length == 5);
                    return $scope.nameValid == true && $scope.addressValid == true && $scope.cityValid == true && $scope.stateValid == true && $scope.zipValid == true;
            }
        }
        
        $scope.next = function(){
            if(!$scope.validate()){
                return; 
            }
            
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
                exp_month: $scope.expirationDate.getMonth()+1,
                exp_year: $scope.expirationDate.getFullYear()
            }, stripeResponseHandler);
        };

    }]);
       