angular.module('rad.loginController', [])

.controller('LoginController', function($scope, $state, $ionicModal, $http, $httpParamSerializerJQLike, dbFactory) {

    // if (dbFactory.isLoggedIn()) {
    //     $state.go('app.tabs.products');
    // }

    $scope.data = {
        email: '',
        password: ''
    }


    $scope.doLogin = function(data) {

      var data_obj = {email: $scope.data.email, password: $scope.data.password};
      $http({
          url: 'http://app.rad.net.my/ounch/c/index.php/access/login_api',
          method: "POST",
          data: $httpParamSerializerJQLike(data_obj),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {
        console.log("http LOGIN post SUCCESS", data);

        console.log("ajaxLogin callback ",data.data);
        
        //login error
        if(data.status=="false"){
          console.log("unsuccessful login=> ", data.message);
        }
        
        //login success
        else{
            localStorage.setItem('rad:user', $scope.data.email);
            localStorage.setItem('rad:user_id', data.data);
            
            $scope.masterCtrl.setCurrentUser($scope.data.email, data.data);
            $scope.masterCtrl.setFavoriteProducts(data.data);
            $scope.masterCtrl.closeLogin();
            // cmp.fireEvent('ajaxGetFavorites', cmp);
        }


      }).error(function (data, status, headers, config) {
             console.log("http LOGIN post FAIL");
      });
    };

});