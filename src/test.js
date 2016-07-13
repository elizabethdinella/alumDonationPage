angular.module('step1App', ['angularPayments'])

	.config(function() {
		window.Stripe.setPublishableKey('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
	})

	.controller('step1Ctrl', function($scope) {
		// Stripe Response Handler
		$scope.stripeCallback = function (code, result) {
			if (result.error) {
				window.alert('it failed! error: ' + result.error.message);
			} else {
				window.alert('success! token: ' + result.id);
			}
		};
	});