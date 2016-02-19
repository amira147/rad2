angular.module('rad.masterController', [])

.controller('MasterController', function($scope, $state, $stateParams, $ionicModal, dbFactory) {
  $this = this;
  $this.userFavorites = [];

  $this.setFavoriteProducts = function(user_id){

    dbFactory.getFavoritesArray(user_id).then(function(resp){
        
      $this.userFavorites = resp;
      localStorage.setItem('rad:favorites', JSON.stringify(resp));
      // console.log("Retrieve favorite products", resp);

    }, function(error){
    });
  }
  
  $this.login = function(){
    $ionicModal.fromTemplateUrl('views/modal-login.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
    });
  }

  $this.closeLogin = function(){
    $scope.modal.hide();
  }

  $this.setCurrentUser = function(){
    $this.setFavoriteProducts(12);
  }
  
  $this.getHumanDate = function(timestamp){
    
        var d = new Date(timestamp * 1000),   // Convert the passed timestamp to milliseconds
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
            dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
            ampm = 'AM',
            time;
                
        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM  
        date = dd + '/' + mm + '/' + yyyy ;
            
        return date;
  }
    
  //Initialize
  $this.setCurrentUser();

});