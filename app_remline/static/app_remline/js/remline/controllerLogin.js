
//----------------------------------------------------------------------------------------------------------------------------
//Controlador para login
//----------------------------------------------------------------------------------------------------------------------------

app.controller('loginController', function ($scope, $http, $uibModalInstance, refresh, $translate) {

    $scope.form_login="login";
    $scope.style1={color:'#30b5f2'};

	$scope.usuarioLogin = {username: "", password: "", email:"pepe@pepe.com"}
	$scope.usuarioNuevo = {username: "", email:"", password1: "", password2: ""}


    $scope.alerts = [

     ];

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


	$scope.login = function (id) {

				$http.post("/api/rest-auth/login/", $scope.usuarioLogin)
				.then(function(respuesta){
					console.log("Login OK", respuesta);
				    $uibModalInstance.dismiss('cancel');

				}, function(respuesta){
					console.log("Login ERROR", respuesta);
					$scope.addAlert('danger', "Error!! " + respuesta.status);
				});

	}


	$scope.register = function (id) {

        if($scope.usuarioNuevo.passConfirm != $scope.usuarioNuevo.pass){
                 $scope.addAlert('danger', 'Confirma correctamente tu contraseña');
        }
        else{
        	    $uibModalInstance.dismiss('cancel');
        }

	}
	
});
