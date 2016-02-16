angular.module('rad.companiesController', [])

.controller('CompaniesController', function($scope, $ionicModal, $timeout, dbFactory){

  $scope.getCompaniesListing = function(){  

    dbFactory.getCompaniesListing().then(function(resp){
      $scope.companiesList = resp;

    }, function(error){
    });

  }
  
  $scope.getCompaniesListing();

});