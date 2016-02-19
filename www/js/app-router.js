

angular
    .module('rad')
    .config(RouterConfigurations);


function RouterConfigurations ($stateProvider, $urlRouterProvider, USER_ROLES_CONST) {

    $stateProvider

      .state('app', {
	    url: '/app',
	    abstract: true,
	    templateUrl: 'views/app-menu.html'
	  })

	  .state('app.search', {
	    url: '/search',
	    views: {
	      'app-content': {
	        templateUrl: 'views/search.html'
	      }
	    }
	  })

	  .state('app.playlists', {
	      url: '/playlists',
	      views: {
	        'app-content': {
	          templateUrl: 'views/playlists.html',
	          controller: 'PlaylistsCtrl'
	        }
	      }
	    })

	  .state('app.browse', {
	      url: '/browse',
	      views: {
	        'app-content': {
	          templateUrl: 'views/browse.html'
	        }
	      }
	    })
	  
	.state('app.tabs', {
	    url: '/tabs',
	    views: {
	        'app-content': {
	            templateUrl: 'views/app-tabs.html'
	        }
	    }
	})

    .state('app.tabs.products', {
        url: '/products',
        views: {
            'tab-products': {
                templateUrl: 'views/tab-product-filters.html'
            }
        }
    })

    .state('app.tabs.products.brands', {
        url: '/products/brands',
        parent: 'app.tabs',
        views: {
            'tab-products': {
                templateUrl: 'views/tab-product-brands.html',
                controller: 'BrandsController'
            }
        }
    })

    .state('app.tabs.products.list', {
        url: '/products/:filter/:filterId',
        parent: 'app.tabs',
        views: {
            'tab-products': {
                templateUrl: 'views/tab-product-list.html',
                controller: 'ProductsController'
            }
        }
    })

    .state('app.tabs.products.categories', {
        url: '/products/categories',
        parent: 'app.tabs',
        views: {
            'tab-products': {
                templateUrl: 'views/tab-product-categories.html',
                controller: 'CategoriesController'
            }
        }
    })

    .state('app.tabs.products.companies', {
        url: '/products/companies',
        parent: 'app.tabs',
        views: {
            'tab-products': {
                templateUrl: 'views/tab-product-companies.html',
                controller: 'CompaniesController'
            }
        }
    })

    .state('app.tabs.companies', {
        url: '/companies',
        views: {
            'tab-companies': {
                templateUrl: 'views/tab-companies.html',
                controller: 'CompaniesController'
            }
        }
    })

    .state('app.tabs.favorites', {
        url: '/favorites',
        views: {
            'tab-favorites': {
                templateUrl: 'views/tab-favorites.html',
                controller: 'ProductsController'
            }
        }
    })

    .state('app.tabs.events', {
        url: '/events',
        views: {
            'tab-events': {
                templateUrl: 'views/tab-events.html',
                controller: 'EventsController'
            }
        }
    })

    .state('app.tabs.scanner', {
        url: '/scanner',
        views: {
            'tab-scanner': {
                templateUrl: 'views/tab-scanner.html',
                controller: 'ScannerController'
            }
        }
    })

    .state('app.tabs.videos', {
        url: '/videos',
        views: {
            'tab-videos': {
                templateUrl: 'views/tab-videos.html'
            }
        }
    })

	  .state('app.single', {
	    url: '/playlists/:playlistId',
	    views: {
	      'app-content': {
	        templateUrl: 'views/playlist.html',
	        controller: 'PlaylistCtrl'
	      }
	    }
	  });
	  // if none of the above states are matched, use this as the fallback
	  $urlRouterProvider.otherwise('/app/tabs/products');

}