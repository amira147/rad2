angular.module('rad.scannerController', [])

.controller('ScannerController', function($scope, $ionicModal, $timeout, $cordovaBarcodeScanner, dbFactory){

  $scope.activeView = 'history';

  $scope.getScannerListing = function(){  

    // dbFactory.getScannerListing().then(function(resp){
    dbFactory.getProductsListing("none").then(function(resp){
      $scope.scannerList = resp;
    }, function(error){
    });

  }
  
  $scope.getScannerListing();

  $scope.scanCode = function(){

    document.addEventListener("deviceready", function () {

      $cordovaBarcodeScanner
        .scan()
        .then(function(result) {
          alert(JSON.stringify(result));
          
          var scanned_url = result.text;

          if(result.format == "QR_CODE"){
            var split_path = scanned_url.split('/'); 
            
            var domain = split_path[2],
                item_type = split_path[3],
                item_id = split_path[split_path.length-1]; 

            if(domain == "rad.net.my"){

              switch(item_type){
                case 'product':
                  alert("launch product details for product_id "+item_id);
                  break;
                case 'company':
                  alert("launch company details for company_id "+item_id);
                  break;
              }

            }
            else{
              alert("URL not recognized by app.");
            }
          } 
          else{
            if(!result.cancelled){
              alert("Code not recognized by app.");
            }
          }

        }, function(error) {
          // An error occurred
          alert(error);
        });

    }, false);

  }

});