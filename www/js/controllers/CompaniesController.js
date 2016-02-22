angular.module('rad.companiesController', [])

.controller('CompaniesController', function($scope, $ionicModal, $ionicScrollDelegate, dbFactory){

    $scope.search         = {};
    $scope.search.show    = false;
    $scope.search.focused = false;
    $scope.search.string  = '';
    
	$scope.getCompaniesListing = function(){

		dbFactory.getCompaniesListing().then(function(resp){
		  $scope.companiesList = resp;
		  console.log("getCompaniesListing", resp);
		}, function(error){
	});

	}

	$scope.scrollTop = function() {
	    $ionicScrollDelegate.scrollTop();
	}


	$scope.clearSearch = function(){
	    console.log($scope.search.string)
	    $scope.search.string = '';
	}


	$scope.toggleSearch = function(){
	    $scope.search.show = !$scope.search.show;
	    $scope.scrollTop();
	}


});