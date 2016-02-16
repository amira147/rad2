angular.module('rad.categoriesController', [])

.controller('CategoriesController', function($scope, $ionicModal, $timeout, dbFactory){

  $scope.getCategoriesListing = function(){  

    dbFactory.getCategoriesListing().then(function(resp){
      $scope.categoriesList = resp;

    }, function(error){
    });

  }
  
  $scope.getCategoriesListing();

});