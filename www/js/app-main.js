// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('rad', [
  'ionic',
  'ion-gallery',
  'angular-toArrayFilter',
  'ngCordova',
  'rad.dbFactory',
  'rad.controllers',
  'rad.masterController',
  'rad.loginController',
  'rad.productsController',
  'rad.brandsController',
  'rad.categoriesController',
  'rad.companiesController',
  'rad.scannerController',
  'rad.eventsController'
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

// .config(function($stateProvider, $urlRouterProvider) {
//   $stateProvider

//     .state('app', {
//     url: '/app',
//     abstract: true,
//     templateUrl: 'views/menu.html',
//     controller: 'AppCtrl'
//   })

//   .state('app.search', {
//     url: '/search',
//     views: {
//       'app-content': {
//         templateUrl: 'views/search.html'
//       }
//     }
//   })

//   .state('app.browse', {
//       url: '/browse',
//       views: {
//         'app-content': {
//           templateUrl: 'views/browse.html'
//         }
//       }
//     })
//     .state('app.playlists', {
//       url: '/playlists',
//       views: {
//         'app-content': {
//           templateUrl: 'views/playlists.html',
//           controller: 'PlaylistsCtrl'
//         }
//       }
//     })

//   .state('app.single', {
//     url: '/playlists/:playlistId',
//     views: {
//       'app-content': {
//         templateUrl: 'views/playlist.html',
//         controller: 'PlaylistCtrl'
//       }
//     }
//   });
//   // if none of the above states are matched, use this as the fallback
//   $urlRouterProvider.otherwise('/app/playlists');
// });


//User Roles Constants
angular
  .module('rad')
  .constant('USER_ROLES_CONST',{
    '10': 'admin_role',
    '20': 'user_role'
  });

