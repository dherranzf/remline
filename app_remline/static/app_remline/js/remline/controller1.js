//

app.controller('controller1', ['$scope', '$http', '$uibModal', "$translate", function($scope, $http, $uibModal,$translate){
	$scope.historiaSeleccionada = null;
	$scope.sucesoSelecc = "";
	$scope.sucesos = null;
	$scope.fechaFormateada= null;

	$scope.file = 'vacio';

	$http.get("/api/historias/")
		.then(function(respuesta){
			console.log("res", respuesta);
			$scope.historias = respuesta.data;
		}, function(respuesta){
			console.log("Error GET historias", respuesta);
			$scope.historias = [{name: "Error!! " + respuesta.status}];
	});

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





