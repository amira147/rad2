angular.module('rad.dbFactory', [])

.factory('dbFactory', dbFactory);

function dbFactory($q, $http, USER_ROLES_CONST) {

	var factory = {};

	factory.getBrandsListing = function(){
		var deferred = $q.defer();

		$http.get('http://app.rad.net.my/rad/c/admin/api/brands')
		
		.success(function(data, status, headers, config) {
			if(data.length){
				deferred.resolve(data);
			} else {
				deferred.resolve([]);
			}
	    })
	    .error(function(data, status, headers, config) {
			deferred.reject(error);
	    });
		
		return deferred.promise;
	}

	factory.getCategoriesListing = function(){
		var deferred = $q.defer();

		$http.get('http://app.rad.net.my/rad/c/admin/api/categories')
		
		.success(function(data, status, headers, config) {
			if(data.length){
				deferred.resolve(data);
			} else {
				deferred.resolve([]);
			}
	    })
	    .error(function(data, status, headers, config) {
			deferred.reject(error);
	    });
		
		return deferred.promise;
	}

	factory.getCompaniesListing = function(){
		var deferred = $q.defer();

		$http.get('http://app.rad.net.my/rad/c/admin/api/company')
		
		.success(function(data, status, headers, config) {
			if(data.length){
				deferred.resolve(data);
			} else {
				deferred.resolve([]);
			}
	    })
	    .error(function(data, status, headers, config) {
			deferred.reject(error);
	    });
		
		return deferred.promise;
	}

	factory.getProductsListing = function(filter, filterId){
		var deferred = $q.defer();

		$http.get('http://app.rad.net.my/rad/c/admin/api/products')
		
		.success(function(data, status, headers, config) {
			if(data.length){
				var products_array = data;
				var filtered_products = [];

				if(filter == "none"){
					deferred.resolve(products_array);
				}
				else{
					_.each(products_array, function(product, index){
						if(filter == "brands"){
							
							if(product.brand.brand_id == filterId){
								filtered_products.push(product);
							}
							
						}
						else if(filter == "categories"){

							if(_.contains(product.cat_id, filterId)){
								filtered_products.push(product);
							}
							
						}
						else if(filter == "companies"){
							
							if(product.company_id == filterId){
								filtered_products.push(product);
							}
							
						}

						if(products_array.length == index+1){
							deferred.resolve(filtered_products);
						}
					})
				}

			} else {
				deferred.resolve([]);
			}
	    })
	    .error(function(data, status, headers, config) {
			deferred.reject(error);
	    });
		
		return deferred.promise;
	}

	factory.getFavoritesListing = function(user_id){
		var deferred = $q.defer();

		factory.getProductsListing("none").then(function(data){
			var products_array = data;

			$http.get('http://app.rad.net.my/rad/c/admin/favorites/ajax_get_favorites/'+user_id)
		
			.success(function(data, status, headers, config) {
				if(data.length){
					var favorites_array = data;
					var filtered_products = [];

						_.each(products_array, function(product, index){
							if(_.contains(favorites_array, product.sys_index)){
								filtered_products.push(product);
							}

							if(products_array.length == index+1){
								console.log(123);
								deferred.resolve(filtered_products);
							}
						})

				} else {
					deferred.resolve([]);
				}
		    })
		    .error(function(data, status, headers, config) {
				deferred.reject(error);
		    });
		});
		
		return deferred.promise;
	}

	factory.getEventsListing = function(){
		var deferred = $q.defer();

		$http.get('http://app.rad.net.my/rad/c/admin/api/events')
		
		.success(function(data, status, headers, config) {
			if(data.length){
				deferred.resolve(data);
			} else {
				deferred.resolve([]);
			}
	    })
	    .error(function(data, status, headers, config) {
			deferred.reject(error);
	    });
		
		return deferred.promise;

	}

	factory.getProductsDetails = function(products_array, product_id){
		var deferred = $q.defer();

		var product_obj = _.find(products_array, function(product){
							return product.sys_index == product_id;
						});

		if(product_obj){
			deferred.resolve(product_obj);
		}
		else{
			deferred.resolve({});
		}

		return deferred.promise;
	}

	return factory;

}