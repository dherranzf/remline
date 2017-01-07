
//----------------------------------------------------------------------------------------------------------------------------
//Controlador para modificar historias
//----------------------------------------------------------------------------------------------------------------------------
app.controller('modalModificarHistoria', function ($scope, $http, $uibModalInstance, $translate, $filter, refresh) {
	console.log("modalModificarHistoria:",refresh.historiaSeleccionada);
	$scope.item = refresh.historiaSeleccionada;
	$scope.mostrarHtml="modificar";
	$scope.tipoEntradaDatos="manual";
	
	  $scope.ok = function () {
			  $http.put("/api/historias/"+$scope.item.id, $scope.item)
				.then(function(respuesta){
					console.log("PUT historias OK", respuesta);
					refresh.historiaSeleccionada=$scope.item;
					refresh.alerts.push({type: 'success',msg: $filter('translate')('_alertMHistoria')});

					$http.get("/api/historias/"+refresh.usuario.username)
                        .then(function(respuesta){
                            console.log("res", respuesta);
                            refresh.historias = respuesta.data;
                            //para dejar seleccionada la historia
                            for (var i = 0; i < refresh.historias.length; i++) {
                                if(refresh.historias[i].nombre==$scope.item.nombre){
                                    refresh.historiaSeleccionada = refresh.historias[i];
                                    //console.log("Historia seleccionada:", refresh.historiaSeleccionada);
                                }
                            }
                        }, function(respuesta){
                            console.log("Error GET historias", respuesta);
                            refresh.historias = [{name: "Error!! " + respuesta.status}];
				    });
				}, function(respuesta){
					console.log("Error PUT historias", respuesta);
					//refresh.historias = [{name: "Error!! " + respuesta.status}];
				});



			  $uibModalInstance.dismiss('cancel');
	  };

	  $scope.eliminar = function () {
		  
			  $http.delete("/api/historias/"+$scope.item.id)
				.then(function(respuesta){
					console.log("DELETE historias OK", respuesta);
					refresh.historiaSeleccionada=null;
					refresh.sucesos=null;
					refresh.alerts.push({type: 'success',msg: $filter('translate')('_alertEHistoria')});

					$http.get("/api/historias/"+refresh.usuario.username)
                        .then(function(respuesta){
                            console.log("res", respuesta);
                            refresh.historias = respuesta.data;
                        }, function(respuesta){
                            console.log("Error GET historias", respuesta);
                            refresh.historias = [{name: "Error!! " + respuesta.status}];
				    });
				}, function(respuesta){
					console.log("Error DELETE historias", respuesta);
					//refresh.historias = [{name: "Error!! " + respuesta.status}];
				});



			  $uibModalInstance.dismiss('cancel');
	  };
	
	  $scope.cancel = function () {
	// Cerramos
	    $uibModalInstance.dismiss('cancel');
	  };
	
});
