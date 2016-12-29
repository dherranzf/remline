
//----------------------------------------------------------------------------------------------------------------------------
//Controlador para login
//----------------------------------------------------------------------------------------------------------------------------

app.controller('loginController', function ($scope, $http, $uibModalInstance, refresh, $translate) {

    $scope.form_login="login";
    $scope.style1={color:'#30b5f2'};

	$scope.usuarioLogin = {nombre: "", pass: ""}
	$scope.usuarioNuevo = {nombre: "", email:"", pass: "", passConfirm: ""}


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

         $scope.addAlert('danger', 'Login Fallido');

	    $uibModalInstance.dismiss('cancel');

	}


	$scope.register = function (id) {



	    $uibModalInstance.dismiss('cancel');

	}
	
});
