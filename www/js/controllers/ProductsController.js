angular.module('rad.productsController', [])

.controller('ProductsController', function($scope, $state, $stateParams, $ionicModal, $ionicPopup, $ionicScrollDelegate, $http, $httpParamSerializerJQLike, dbFactory) {

  	var filter = $stateParams.filter; 
  	var filterId = $stateParams.filterId;
  	$scope.search         = {};
    $scope.search.show    = false;
    $scope.search.focused = false;
    $scope.search.string  = '';
  	$scope.images = [];

	$scope.scrollTop = function() {
	    $ionicScrollDelegate.scrollTop();
	}


	$scope.clearSearch = function(){
	    // console.log($scope.search.string)
	    $scope.search.string = '';
	}


	$scope.toggleSearch = function(){
	    $scope.search.show = !$scope.search.show;
	    $scope.scrollTop();
	}
  	
  	dbFactory.getProductsListing("none").then(function(data){
		$scope.allProducts = data;
  	});

  	$scope.getProductsListing = function(){
	  	dbFactory.getProductsListing(filter, filterId).then(function(resp){
	    	
	    	$scope.productsList = resp;
	  		console.log("Retrieve products by ", filter, " for id ", filterId, resp);
	  		// console.log(123, resp.length);

	    }, function(error){
	    });

  	}

  	$scope.toggleBookmarkProduct = function(product_id){
  		console.log("1 toggleBookmarkProduct", $scope.masterCtrl.userFavorites);
    	
    	var mode;
    	var userFavorites = $scope.masterCtrl.userFavorites;

    	//add favorite
		if(!_.contains(userFavorites, product_id)){
			userFavorites.push(product_id);
			mode = "add";
		}
		
		// remove favorite
		else{
			userFavorites.splice(userFavorites.indexOf(product_id), 1);
			mode = "remove";
		}

		var data_obj = {user_id: 12, product_id: product_id};
		$http({
		    url: 'http://app.rad.net.my/rad/c/admin/favorites/ajax_'+mode+'_favorite',
		    method: "POST",
		    data: $httpParamSerializerJQLike(data_obj),
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function (data, status, headers, config) {
           console.log("http post SUCCESS");
			localStorage.setItem('rad:favorites', JSON.stringify(userFavorites));

			if(mode=="add"){
				$scope.productDetails.is_bookmarked = true;
			}
			else{
				$scope.productDetails.is_bookmarked = false;
			}

		  	$scope.getFavoritesListing();
		}).error(function (data, status, headers, config) {
           console.log("http post FAIL");
		});

  	}

  	// $scope.isDefault = function(property){
  	// 	return property == "true" ? true : false;
  	// }

  	$scope.getFavoritesListing = function(){
	
  		// if($scope.masterCtrl.isLoggedIn()){

		  	dbFactory.getFavoritesListing().then(function(resp){
		    	
		    	$scope.favoritesList = resp;
		  		console.log("Retrieve favorite products", resp);

		    }, function(error){
		    });
  		// }

  	}

  	$scope.$on('$stateChangeSuccess', function () {
	  if($state.current.name == "app.tabs.favorites"){
	  	$scope.getFavoritesListing();
	  }
	});

  // 	$ionicModal.fromTemplateUrl('views/modal-product-details.html', {
  //       scope: $scope,
  //       animation: 'slide-in-up'
  //   }).then(function(modal) {
  //       $scope.modal = modal;
  //   });

  //   $scope.openProductDetails = function(product_id){
  //   	var userFavorites = $scope.masterCtrl.userFavorites;

  //   	$scope.productDetails = _.find($scope.allProducts, function(product){
  //   		product.is_bookmarked = _.contains(userFavorites, product.sys_index);
    		
  //   		return product.sys_index == product_id;
  //   	});
	    
	 //    $scope.images = _.map($scope.productDetails.images, function(img_obj, index){
		// 	var obj = {
		// 		src: img_obj.img_full,
		// 		thumb: img_obj.img_thumbnail
		// 	}
		// 	return obj;
		// });

		// // console.log("openProductDetails", $scope.productDetails);
		// $scope.modal.show();
  //   }

  //   $scope.closeProductDetails = function(){
  //       $scope.modal.hide();
  //   }

    // $scope.getCompanyName = function(company_id){

    // 	dbFactory.getCompanyById(company_id).then(function(data){
    // 		return data.company_name;
    // 	});
    // }
 
})


.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});;