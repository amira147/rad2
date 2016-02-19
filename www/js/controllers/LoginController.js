angular.module('rad.loginController', [])

.controller('LoginController', function($scope, $state, $ionicModal, dbFactory) {

    // if (dbFactory.isLoggedIn()) {
    //     $state.go('app.tabs.products');
    // }

    $scope.data = {
        email: '',
        password: ''
    }


    $scope.login = function(data) {
      console.log("login function");
        // $ionicLoading.show({
        //     template: 'Authenticating ...'
        // });


        // FirebaseFactory.loginUser({email: data.email, password: data.password})
        //     .then(function(authData) {

        //       $scope.masterCntr.setCurrentUser(authData);
        //         $state.go('app.tabs.dash', {}, {reload: true});
        //         $ionicLoading.hide();
        //     }, function(err) {

        //         var alertPopup = $ionicPopup.alert({
        //             title: 'Login failed!',
        //             template: 'Please check your credentials!'
        //         });
        //         $ionicLoading.hide();
        //     });
            Ext.Ajax.request({
                url: macsk.util.Globals.getAccessUrl()+'access/login_api',
                method: 'POST',

                params: {
                    email: user.login_email,
                    password: user.login_password
                },

                callback: function(options, success, response) {
                    Ext.Viewport.unmask();

                    var data = JSON.parse(response.responseText);
                    console.log("ajaxLogin callback ",data.data);
                    
                    //login error
                    if(data.status=="false"){
                        var html = "<div class='login-error muted'><i class='fa fa-exclamation-circle' style='font-size:25px;color:red;opacity:0.7;'></i><br>"+data.message+"</div>";
                        Ext.getCmp('login_user_form').setHidden(true);
                        Ext.getCmp('login_user_form').down('textfield').setValue('');
                        // Ext.getCmp('login_page').setHtml(html);
                        Ext.getCmp('error_message').setHtml(html);
                        Ext.getCmp('error_message').setHidden(false);
                        Ext.getCmp('ok_button').setHidden(false);
                        Ext.getCmp('login_button').setHidden(true);

                    }
                    
                    //login success
                    else{
                        // Ext.getCmp('login_button').fireEvent('ajaxGetFavorites');
                        localStorage.user = user.login_email;
                        localStorage.user_id = data.data;

                        cmp.fireEvent('ajaxGetFavorites', cmp);
                // Ext.Viewport.add(Ext.create('macsk.view.FirstFilter'));

                // //close this panel
           //              cmp.up('panel').addCls('animate-hidden');
           //              setTimeout(function(){
           //                  cmp.up('panel').destroy();
           //              },300);
                    }
                }
            });
    };

});