angular.module('rad.eventsController', [])

.controller('EventsController', function($scope, $ionicModal, $timeout, dbFactory){

  $scope.getEventsListing = function(){  

    dbFactory.getEventsListing().then(function(resp){
      $scope.eventsList = resp;
    }, function(error){
    });

  }


});