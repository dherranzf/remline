
//----------------------------------------------------------------------------------------------------------------------------
//Controlador para nuevos de sucesos
//----------------------------------------------------------------------------------------------------------------------------

app.controller('modalNuevoSuceso', function ($scope, $http, $uibModalInstance, $translate, $filter, refresh) {

	$scope.item = {nombre: "", descripcion: "", fecha: "", tipo: "", coste: "", media: "http://www.", historia: ""}

	//datepicker
	  $scope.today = function() {
	    $scope.item.fecha = new Date();
	  };
	  $scope.today();

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
		  refresh.sucesoSelecc = "";
		  $scope.loadData = function(){
			  $scope.item.historia = refresh.historiaSeleccionada.id;
			  $http.post("/api/sucesos/", $scope.item)
				.then(function(respuesta){
					console.log("POST sucesos OK", respuesta);
					refresh.alerts.push({type: 'success',msg: $filter('translate')('_alertNSuceso')});

				}, function(respuesta){
					console.log("Error POST sucesos", respuesta);
					refresh.sucesos = [{name: "Error!! " + respuesta.status}];
				});
			  $uibModalInstance.dismiss('cancel');
		  }
		  $scope.loadData();

		  $http.get("/api/sucesos/"+$scope.item.historia)
			.then(function(respuesta){
				console.log("res", respuesta);
				refresh.sucesos = respuesta.data;
			}, function(respuesta){
				console.log("Error GET sucesos", respuesta);
				refresh.sucesos = [{name: "Error!! " + respuesta.status}];
		});
	  };
	
	  $scope.cancel = function () {
	// Cerramos
	    $uibModalInstance.dismiss('cancel');
	  };
	
});
