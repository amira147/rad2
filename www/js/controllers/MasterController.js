angular.module('rad.masterController', [])

.controller('MasterController', function($scope, $state, $stateParams, dbFactory) {
  $this = this;
  $this.userFavorites = [];

  $this.setFavoriteProducts = function(user_id){
    console.log("MasterController setFavoriteProducts");

    dbFactory.getFavoritesArray(user_id).then(function(resp){
        
      $this.userFavorites = resp;
      localStorage.setItem('rad:favorites', JSON.stringify(resp));
      // console.log("Retrieve favorite products", resp);

    }, function(error){
    });
  }

  $this.setCurrentUser = function(){
    console.log("MasterController setCurrentUser");
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