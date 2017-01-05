//----------------------------------------------------------------------------------------------------------------------------
//Controlador para nuevas historias
//----------------------------------------------------------------------------------------------------------------------------

app.controller('modalNuevaHistoria', function ($scope, $http, $uibModalInstance, $translate, $filter, refresh, $auth) {
	
	$scope.item = {nombre: "", descripcion: "", propietario:refresh.usuario.username}
	$scope.tipoEntradaDatos="decidir";//decidir,manual,csv
	var noDismiss= false;//para no cerrar la venta modal si no queremos

	  $scope.ok = function () {
		  refresh.sucesoSelecc = "";
		  $scope.loadData = function(){
			  $http.post("/api/historias/", $scope.item)
				.then(function(respuesta){
					console.log("POST historias OK", respuesta);
					refresh.sucesos=[];
			    	refresh.alerts.push({type: 'success',msg: $filter('translate')('_alertNHistoria')});

				}, function(respuesta){
					console.log("Error POST historias", respuesta);
					refresh.historias = [{name: "Error!! " + respuesta.status}];
				});
			  if(!noDismiss) $uibModalInstance.dismiss('cancel');
		  }
		  $scope.loadData();

		  $http.get("/api/historias/"+refresh.usuario.username)
			.then(function(respuesta){
				console.log("res", respuesta);
				refresh.historias = respuesta.data;
				//para dejar seleccionada la historia
				for (var i = 0; i < refresh.historias.length; i++) {
				  	if(refresh.historias[i].nombre==$scope.item.nombre){
				  		if(!noDismiss) refresh.historiaSeleccionada = refresh.historias[i];
						//console.log("Historia seleccionada:", refresh.historiaSeleccionada);
					}
				}
			}, function(respuesta){
				console.log("Error GET historias", respuesta);
				refresh.historias = [{name: "Error!! " + respuesta.status}];
		  });



	  };
	
	  $scope.cancel = function () {
	// Cerramos
	    $uibModalInstance.dismiss('cancel');
	  };

	  $scope.cargarArchivo = function () {
		// Convertimos datos del archivo(ya en formato JSON) en una historia con eventos
		// y mandamos al back
		console.log("cargarArchivo",$scope.file);

		//guardamos historia
		//obtenemos id de historia
		//noDismiss= true;
		//$scope.ok();
		  refresh.sucesoSelecc = "";
			  $http.post("/api/historias/", $scope.item)
				.then(function(respuesta){
					console.log("POST historias OK", respuesta);
					refresh.sucesos=[];
					//obtenemos id de historia
					  $http.get("/api/historias/"+refresh.usuario.username)
						.then(function(respuesta){
							console.log("res", respuesta);
							refresh.historias = respuesta.data;
							//para dejar seleccionada la historia
							for (var i = 0; i < refresh.historias.length; i++) {
							  	if(refresh.historias[i].nombre==$scope.item.nombre){
							  		refresh.historiaSeleccionada = refresh.historias[i];
								}
							}
							//guardamos eventos
							var event_enviar = {nombre: "", descripcion: "", fecha: "", tipo: "", coste: "", media: "http://www.", historia: ""}
							for(var i = 0; i < $scope.file.length; i++)
							{
								if($scope.file[i].url==undefined){//linea vacia o erronea
									console.log("linea vacia o erronea");
								    continue;
								}

								event_enviar = {nombre: $scope.file[i].nombre, 
										descripcion: $scope.file[i].descripcion, 
										fecha: (new Date($scope.file[i].fecha)),
										tipo: $scope.file[i].tipo, 
										coste: $scope.file[i].relevancia, 
										media: $scope.file[i].url, 
										historia: refresh.historiaSeleccionada.id
								}

								  
								$http.post("/api/sucesos/", event_enviar)
									.then(function(respuesta){
									   console.log("POST sucesos OK", respuesta);
									   console.log("suceso OK", i);
									   if(i>=$scope.file.length-1){//ultima iteracion
										$http.get("/api/sucesos/"+refresh.historiaSeleccionada.id)
											.then(function(respuesta){
												console.log("GET sucesos OK", respuesta);
												refresh.sucesos = respuesta.data;
			    	                            refresh.alerts.push({type: 'success',msg: $filter('translate')('_alertNHistoria')});
											}, function(respuesta){
												console.log("Error GET sucesos", respuesta);
												refresh.sucesos = [{name: "Error!! " + respuesta.status}];
										});
									   }
									}, function(respuesta){
										console.log("Error POST sucesos", respuesta);
										refresh.sucesos = [{name: "Error!! " + respuesta.status}];
								});
				
							}

						}, function(respuesta){
							console.log("Error GET historias", respuesta);
							refresh.historias = [{name: "Error!! " + respuesta.status}];
					  });
				}, function(respuesta){
					console.log("Error POST historias", respuesta);
					refresh.historias = [{name: "Error!! " + respuesta.status}];
				});
		  

	        $uibModalInstance.dismiss('cancel');
	  };
	
});
