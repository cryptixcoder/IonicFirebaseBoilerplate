angular.module('IonicfireBoilerplate.controllers', [])
	.controller('LoginCtrl',['$scope','Auth', function($scope, Auth){
		$scope.user = {};

		$scope.login = function(){
			Auth.login($scope.user).then(function(user){
				//The root scope will handle navigation
			},
			function(err){
				console.log(err);
				$scope.error = toString(err.message);
			});
		};
	}])
	.controller('SignupCtrl',['$scope','Auth', 'User', '$state', function($scope, Auth, User, $state){
		$scope.user = {};

		$scope.signup = function(){
			Auth.signup($scope.user).then(function(authUser){
				User.create(authUser, $scope.user);
				$state.go('main');
			},
			function(err){
				$scope.error = toString(err);
			});
		};
	}])
	.controller('MainCtrl',['$scope','Auth', function($scope, Auth){
		$scope.logout = function(){
			Auth.logout();
		};

	}]);