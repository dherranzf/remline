
//----------------------------------------------------------------------------------------------------------------------------
//Controlador para modificar sucesos
//----------------------------------------------------------------------------------------------------------------------------

app.controller('modalModificarSuceso', function ($scope, $http, $uibModalInstance,  refresh) {
	console.log("modalModificarSuceso:",refresh.sucesoSelecc);

	$scope.mostrarHtml="modificar";
	$scope.item = { id: refresh.sucesoSelecc.id,
			nombre: refresh.sucesoSelecc.nombre, 
			descripcion: refresh.sucesoSelecc.descripcion, 
			fecha: (new Date(refresh.sucesoSelecc.fecha)),
			tipo: refresh.sucesoSelecc.tipo, 
			coste: refresh.sucesoSelecc.coste, 
			media: refresh.sucesoSelecc.media, 
			historia: refresh.sucesoSelecc.historia}



	//datepicker
	  $scope.clear = function() {
	    $scope.item.fecha = null;
	  };

	  $scope.dateOptions = {
	    formatYear: 'yy',
	    startingDay: 1
	  };

	  $scope.open1 = function() {
	    $scope.popup1.opened = true;
	  };

	  $scope.popup1 = {
	    opened: false
	  };


	  $scope.ok = function () {
			  $http.put("/api/sucesos/"+$scope.item.id, $scope.item)
				.then(function(respuesta){
					console.log("PUT sucesos OK", respuesta);
					refresh.sucesoSelecc=$scope.item;
				}, function(respuesta){
					console.log("Error PUT sucesos", respuesta);
					//refresh.sucesos = [{name: "Error!! " + respuesta.status}];
				});

				  $http.get("/api/sucesos/"+$scope.item.historia)
					.then(function(respuesta){
						console.log("res", respuesta);
						refresh.sucesos = respuesta.data;
						//para dejar seleccionada el suceso
						for (var i = 0; i < refresh.sucesos.length; i++) {
						  	if(refresh.sucesos[i].nombre==$scope.item.nombre){
						  		refresh.sucesoSelecc = refresh.sucesos[i];
							}
						}
					}, function(respuesta){
						console.log("Error GET sucesos", respuesta);
						refresh.sucesos = [{name: "Error!! " + respuesta.status}];
				  });

			  $uibModalInstance.dismiss('cancel');
	  };

	  $scope.eliminar = function () {
		  
			  $http.delete("/api/sucesos/"+$scope.item.id)
				.then(function(respuesta){
					console.log("DELETE sucesos OK", respuesta);
					refresh.sucesoSelecc="";
				}, function(respuesta){
					console.log("Error DELETE sucesos", respuesta);
					//refresh.historias = [{name: "Error!! " + respuesta.status}];
				});

				  $http.get("/api/sucesos/"+$scope.item.historia)
					.then(function(respuesta){
						console.log("res", respuesta);
						refresh.sucesos = respuesta.data;
					}, function(respuesta){
						console.log("Error GET sucesos", respuesta);
						refresh.sucesos = [{name: "Error!! " + respuesta.status}];
				  });

			  $uibModalInstance.dismiss('cancel');
	  };
	
	  $scope.cancel = function () {
	// Cerramos
	    $uibModalInstance.dismiss('cancel');
	  };
	
});
