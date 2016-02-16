angular.module('rad.productsController', [])

.controller('ProductsController', function($scope, $state, $stateParams, $ionicModal, $ionicPopup, $timeout, dbFactory) {

  	var filter = $stateParams.filter; 
  	var filterId = $stateParams.filterId;

  	$scope.images = [];
  	dbFactory.getProductsListing("none").then(function(data){
		$scope.allProducts = data;
  	});

  	console.log($scope.images);
  	$scope.getProductsListing = function(){
	  	
	  	dbFactory.getProductsListing(filter, filterId).then(function(resp){
	    	
	    	$scope.productsList = resp;
	  		console.log("Retrieve products by ", filter, " for id ", filterId, resp);

	    }, function(error){
	    });

  	}

  	$scope.isDefault = function(property){
  		return property == "true" ? true : false;
  	}

  	$scope.getFavoritesListing = function(){
	  	
	  	dbFactory.getFavoritesListing(12).then(function(resp){
	    	
	    	$scope.favoritesList = resp;
	  		console.log("Retrieve favorite products", resp);

	    }, function(error){
	    });

  	}

  	$ionicModal.fromTemplateUrl('views/modal-product-details.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openProductDetails = function(product_id){
    	$scope.productDetails = _.find($scope.allProducts, function(product){
    		return product.sys_index == product_id;
    	});
	    
	    $scope.images = _.map($scope.productDetails.images, function(img_obj, index){
			var obj = {
				src: img_obj.img_full,
				thumb: img_obj.img_thumbnail
			}
			return obj;
		});

		console.log("openProductDetails", $scope.productDetails);
		$scope.modal.show();
    }

    $scope.closeProductDetails = function(){
        $scope.modal.hide();
    }
 
});