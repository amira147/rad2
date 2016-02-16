angular.module('rad.brandsController', [])

.controller('BrandsController', function($scope, $ionicModal, $timeout, dbFactory){

  // $scope.brandsList = dbFactory.getBrandsListing();

  $scope.getBrandsListing = function(){  

    dbFactory.getBrandsListing().then(function(resp){
      $scope.brandsList = resp;

    }, function(error){
    });

  }
  
  $scope.getBrandsListing();

});