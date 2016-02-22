angular.module('rad.masterController', [])

.controller('MasterController', function($scope, $state, $stateParams, $ionicModal, dbFactory) {
  $this = this;
  $this.userFavorites = [];
  $this.user = {
    email: '',
    user_id: ''
  };
  $scope.images = {};

  dbFactory.getProductsListing("none").then(function(data){
    $scope.allProducts = data;
  });

  dbFactory.getCompaniesListing().then(function(data){
    $scope.allCompanies = data;
  });

  $this.setFavoriteProducts = function(user_id){

    dbFactory.getFavoritesArray(user_id).then(function(resp){
        
      $this.userFavorites = resp;
      localStorage.setItem('rad:favorites', JSON.stringify(resp));
      // console.log("Retrieve favorite products", resp);

    }, function(error){
    });
  }

  $this.openProductDetails = function(product_id){

      $ionicModal.fromTemplateUrl('views/modal-product-details.html', {
          scope: $scope,
          animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.modal = modal;

          var userFavorites = $scope.masterCtrl.userFavorites;

          $scope.productDetails = _.find($scope.allProducts, function(product){
            product.is_bookmarked = _.contains(userFavorites, product.sys_index);
            
            return product.sys_index == product_id;
          });
          console.log("openProductDetails", $scope.productDetails);
        if($scope.productDetails){
          
          $scope.images = _.map($scope.productDetails.images, function(img_obj, index){
            var obj = {
              src: img_obj.img_full,
              thumb: img_obj.img_thumbnail
            }
            return obj;
          });

          $scope.modal.show();
        }
        else{
          alert("Product not found");
        }
      });
  }

  $this.openCompanyDetails = function(company_id){

      $ionicModal.fromTemplateUrl('views/modal-company-details.html', {
          scope: $scope,
          animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.modal = modal;

          $scope.companyDetails = _.find($scope.allCompanies, function(company){
            
            return company.sys_index == company_id;
          });
          console.log("openCompanyDetails", $scope.companyDetails);
        
        if($scope.companyDetails){
          
          $scope.modal.show();
        }
        else{
          alert("Product not found");
        }
      });
  }

  $this.closeModal = function(){
      $scope.modal.hide();
  }

  $this.isDefault = function(property, name){
    return property == "true" ? true : false;
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
  
  $this.logout = function(){
    localStorage.removeItem('rad:user');
    localStorage.removeItem('rad:user_id');
    localStorage.removeItem('rad:favorites');
    $this.user.email = '';
    $this.user.user_id = '';
  }

  $this.closeLogin = function(){
    $scope.modal.hide();
  }

  $this.setCurrentUser = function(email, user_id){
    $this.user.email = email;
    $this.user.user_id = user_id;
  }

  $this.isLoggedIn = function(){
    if($this.user.email && $this.user.user_id){
      console.log("User is logged in");
      return true;
    }

      console.log("User is not logged in");
    return false;
  }
  
  $this.openWebsite = function(url){
    console.log("openWebsite", url);
    window.open(url, '_system', 'location=yes');
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
  if(localStorage.getItem('rad:user')){
    $this.setCurrentUser(localStorage.getItem('rad:user'), localStorage.getItem('rad:user_id'));
  }

});