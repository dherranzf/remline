
//----------------------------------------------------------------------------------------------------------------------------
//Controlador para login
//----------------------------------------------------------------------------------------------------------------------------

app.controller('loginController', function ($scope, $http, $uibModalInstance, refresh, $translate, $filter, $auth) {

    $scope.form_login="login";
    $scope.style1={color:'#30b5f2'};

	$scope.usuarioLogin = {username: "", password: "", email:""}
	$scope.usuarioNuevo = {username: "", email:"", password1: "", password2: ""}

    $scope.recordarPass = {uid: "", token:"", new_password1: "", new_password2: ""}


    $scope.alerts = [];
    $scope.addAlert = function(t, m) {
    	//success(verde), info(azul), warning(amarillo), danger(rojo)
        $scope.alerts.push({type: t,msg: m});
    };
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

  	$scope.cambiarIdioma = function(lang){
   		$translate.use(lang);
  	}


	$scope.login = function () {
        console.log("Logueaaando");

            $auth.login($scope.usuarioLogin)
            .then(function(req){
                	console.log("Login OK");
					refresh.usuario = $scope.usuarioLogin;
                    console.log("guardar token",req);
					$auth.setToken(req.data.key);

                    $http.get("/api/historias/"+refresh.usuario.username)
                        .then(function(respuesta){
                            console.log("res", respuesta);
                            refresh.historias = respuesta.data;
                        }, function(respuesta){
                            console.log("Error GET historias", respuesta);
                            refresh.historias = [{name: "Error!! " + respuesta.status}];
                    });

				    $uibModalInstance.dismiss('cancel');
            })
            .catch(function(respuesta){
                console.log("Login ERROR", respuesta);
                $scope.addAlert('danger', $filter('translate')('_alertLogin') + respuesta.status);

            });


				/*$http.post("/api/rest-auth/login/", $scope.usuarioLogin)
				.then(function(respuesta){
					console.log("Login OK", respuesta);
					refresh.usuario = $scope.usuarioLogin;

				    $uibModalInstance.dismiss('cancel');

				}, function(respuesta){
					console.log("Login ERROR", respuesta);
					$scope.addAlert('danger', "Error de autenticación - " + respuesta.status);
				});*/

	}


	$scope.register = function (id) {

        if($scope.usuarioNuevo.passConfirm != $scope.usuarioNuevo.pass){
                 $scope.addAlert('danger', $filter('translate')('_alertRegistro'));

        }else{


                $auth.signup($scope.usuarioNuevo)
                .then(function(req) {
                    console.log("Registro OK");
                    console.log("guardar token",req);
					$auth.setToken(req.data.key)
					$scope.addAlert('success', $filter('translate')('_alertRegistro2'));
                })
                .catch(function(respuesta) {
					console.log("Registro ERROR", respuesta);
					$scope.addAlert('danger', $filter('translate')('_alertRegistro3') + respuesta.status);
			    });

        		/*$http.post("/api/rest-auth/registration/", $scope.usuarioNuevo)
				.then(function(respuesta){
					console.log("Registro OK", respuesta);
					$scope.addAlert('success', 'Usuario registrado correctamente');

				}, function(respuesta){
					console.log("Registro ERROR", respuesta);
					$scope.addAlert('danger', "Error de registro - " + respuesta.status);
				});*/

        }

	}

	$scope.recordar = function () {

                if($scope.usuarioLogin.email==""){
                       $scope.addAlert('danger', $filter('translate')('_alertResetPass'));
                } else{

                    var emailRecordar = {email:""}
                    emailRecordar.email = $scope.usuarioLogin.email;
                    $http.post("/api/rest-auth/password/reset/", emailRecordar)
                    .then(function(respuesta){
                        console.log("Recordar contraseña OK", respuesta);
                        $scope.addAlert('success',$filter('translate')('_alertResetPass2'));
                        $scope.form_login="recordar";


                    }, function(respuesta){
                        console.log("Recordar contraseña ERROR", respuesta);
                        $scope.addAlert('danger',$filter('translate')('_alertResetPass3') + respuesta.status);
                    });

                }
    }

    $scope.recordarConfirm = function () {

                $http.post("/api/rest-auth/password/reset/confirm/", $scope.recordarPass)
				.then(function(respuesta){
					console.log("Confirmar recordar contraseña OK", respuesta);
					$scope.addAlert('success', $filter('translate')('_alertResetConfirmPass1'));

				}, function(respuesta){
					console.log("Confirmar recordar  contraseña ERROR", respuesta);
					$scope.addAlert('danger', $filter('translate')('_alertResetConfirmPass2') + respuesta.status);
				});


    }
	
});
