//

app.controller('controller1', ['$scope', '$http', '$uibModal', "$translate", "$auth", function($scope, $http, $uibModal,$translate, $auth){
	$scope.historiaSeleccionada = null;
	$scope.sucesoSelecc = "";
	$scope.sucesos = null;
	$scope.fechaFormateada= null;
	$scope.usuario= {username: "No logueado", password: "", email:""};

	$scope.file = 'vacio';

	$scope.alerts = [/*{type: "success",msg: 'Probando opacidad'}*/];
    $scope.addAlert = function(t, m) {
    	//success(verde), info(azul), warning(amarillo), danger(rojo)
        $scope.alerts.push({type: t,msg: m});
    };
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };


	 // Metodo para abrir la ventana modal de login
	 $scope.login = function () {
		    var uibModalInstance = $uibModal.open({
		      animation: $scope.animationsEnabled,
		      backdrop: 'static',
		      keyboard: false,
		      templateUrl: 'login.html',
		      controller: 'loginController',
		      resolve:{
		    		refresh: function () {
		    			return $scope;
		    		}
		    	}
		    });

	};
	$scope.login();


	$scope.sucesos_por_historia = function (id) {
		$scope.sucesoSelecc = "";
		$http.get("/api/sucesos/"+id)
			.then(function(respuesta){
				console.log("res", respuesta);
				$scope.sucesos = respuesta.data;
			}, function(respuesta){
				$scope.sucesos = [{name: "Error!! " + respuesta.status}];
		});
	}

	$scope.formateoFecha = function () {
		if($scope.sucesoSelecc!=""){
			var fecha = (new Date ($scope.sucesoSelecc.fecha));
			//$scope.sucesoSelecc.fecha = (fecha.getDate()) + "/" + (fecha.getMonth()+ 1) + "/" + fecha.getFullYear();
			$scope.fechaFormateada = fecha.getDate().toString() + "/" + 
					(fecha.getMonth()+ 1).toString() + "/" + fecha.getFullYear().toString() ; 
			return null;
		} else{
			return null;
		}	
	}

  	$scope.cambiarIdioma = function(lang){
   		$translate.use(lang); 
  	}

  	$scope.logout = function(){
   		console.log("Logout del usuario", $scope.usuario.username);
   		$scope.usuario = {username: "No logueado", password: "", email:""};

   		//se realiza el logout con peticion hacia el back,
   		//ya que satellizer no la hace(como si sucede en los login o signin)
   		$http.post("/api/rest-auth/logout/", {})
		    .then(function(respuesta){
					console.log("Logout rest-auth OK", respuesta);
                    $auth.logout()
                        .then(function() {
                         console.log("Logout satellizer OK");
                    });
			}, function(respuesta){
					console.log("Logout ERROR", respuesta);
					$scope.addAlert('danger', "Error logout - " + respuesta.status);
		});

        $scope.login();
  	}


	  // Metodo para abrir la ventana modal de nueva historia
	  $scope.nueva_historia = function (index) {
		    var uibModalInstance = $uibModal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'modalNuevaHistoria.html',
		      controller: 'modalNuevaHistoria',
		      resolve:{ 
		    		refresh: function () {
		    			return $scope;
		    		}
		    	}	
		    });
		    
		  };

	  // Metodo para abrir la ventana modal de nuevo suceso
	  $scope.anadir_suceso = function (index) {
		    var uibModalInstance = $uibModal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'modalNuevoSuceso.html',
		      controller: 'modalNuevoSuceso',
		      resolve:{ 
		    		refresh: function () {
		    			return $scope;
		    		}
		    	}	
		    });
		    
		  };

	  // Metodo para abrir la ventana modal de modificacion de historia
	  $scope.modificar_historia = function (index) {
		    var uibModalInstance = $uibModal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'modalNuevaHistoria.html',
		      controller: 'modalModificarHistoria',
		      resolve:{ 
		    		refresh: function () {
		    			return $scope;
		    		}
		    	}	
		    });
		    
		  };

	  // Metodo para abrir la ventana modal de modificacion de suceso
	  $scope.modificar_suceso = function (index) {
		    var uibModalInstance = $uibModal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'modalNuevoSuceso.html',
		      controller: 'modalModificarSuceso',
		      resolve:{ 
		    		refresh: function () {
		    			return $scope;
		    		}
		    	}	
		    });
		    
		  };

}]);





