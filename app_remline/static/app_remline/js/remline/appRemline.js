var app = angular.module('appTest',['ui.bootstrap','ngRoute', 'pascalprecht.translate'])  
   .config(function ($interpolateProvider, $httpProvider, $translateProvider) {
	//cambio de simbolos scope
   	$interpolateProvider.startSymbol('{/');
  	$interpolateProvider.endSymbol('/}');

	//csrftoken en la cabeceras
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

	//translate
	$translateProvider.translations('es',{
    		"_nuevaHistoria" : "Nueva historia",
    		"_verHistorias" : "Ver historias",
    		"_preTitulo" : "Líneas temporales dinámicas",
		//navigation
    		"_inicio" : "INICIO",
    		"_ayuda" : "AYUDA",
    		"_idioma" : "IDIOMA",
		//remline
    		"_seleccionaHistoria" : "Selecciona una historia:",
    		"_seleccione" : "- Seleccione -",
    		"_modHistoria" : "Modificar historia",
    		"_modEvento" : "Modificar evento",
    		"_evento" : "Evento",
    		"_noDibujo" : "Selecciona una historia con eventos o créalos nuevos.",
		//ayuda
    		"_crearRemline" : "Crear remline", 
    		"_crearRemlineInfo" : "Puedes crear nuevas lineas de tiempo pulsando en 'Nueva Historia'. Y elegir la forma de obtener los datos de los eventos.", 
    		"_verModRemline" : "Ver y modificar remlines", 
    		"_verModRemlineInfo" : "Y añadir nuevos eventos en '+ evento'.",
		"_verModRemlineInfo2" : "Puedes ver las historias ya creadas y modificarlas 'selecciona una historia'.",
		"_verModRemline" : "Ver y modificar remlines",
		//footer
		"_footer" : "Remline es un proyecto orientado a la creación de líneas temporales dinámicas a partir de datos obtenidos de diversas formas.",
		//modalHistoria
    		"_addHistoria" : "Añadir historia:",
    		"_modHistoria2" : "Modificar historia:",
    		"_nombre" : "Nombre",
		"_descripcion" : "Descripción",	
    		"_selecForma" : "Selecciona una forma de introducir los datos de tú nueva historia:",
		"_explicaCSV" : "Para cargar los eventos de tú nueva historia desde un fichero de tipo CSV se debe seguir el siguiente formato(una línea por evento):",	
		"_explicaCSV1" : "Primera línea -> nombre,descripcion,fecha,tipo,relevancia,url ",	
		"_explicaCSV2" : "Ejemplo línea (evento) -> Nacimiento,Día en...,21/04/1994,Personal,1,http://www...",	
		"_explicaCSV3" : "Selecciona un fichero",		
		//modalSuceso
    		"_addSuceso" : "Añadir evento:",
    		"_modSuceso" : "Modificar evento:",
    		"_tipo" : "Tipo",
    		"_fecha" : "Fecha",
    		"_coste" : "Relevancia",
    		"_costeInfo" : "Importancia del evento",
    		"_costeNormal" : "1 - Normal",
    		"_costeImportante" : "2 - Importante",
    		"_costeMuyImportante" : "3 - Muy Importante",
    		"_media" : "Media",
    		"_mediaInfo" : "Sigue el formato:",
    		"_mediaInfo2" : "http://www.tuEnlace.com",
		//botonesModales
    		"_aceptar" : "Aceptar",
    		"_cerrar" : "Cancelar",
    		"_eliminarHistoria" : "Eliminar Historia",
    		"_eliminarSuceso" : "Eliminar Evento",
		"_cargarArchivo" : "Cargar archivo",
		"_botonManual" : "Introducir datos manualmente",
		"_botonCSV" : "Desde archivo CSV"

  	});
  	$translateProvider.translations('en',{
    		"_nuevaHistoria" : "New story",
    		"_verHistorias" : "View stories",
    		"_preTitulo" : "Dinamic Timelines",
		//navigation
    		"_inicio" : "HOME",
    		"_ayuda" : "HELP",
    		"_idioma" : "LANGUAGE",
		//remline
    		"_seleccionaHistoria" : "Select a story:",
    		"_seleccione" : "- Select -",
    		"_modHistoria" : "Modify story",
    		"_modEvento" : "Modify event",
    		"_evento" : "Event",
    		"_noDibujo" : "Select a story with events or create new ones.", 
		//ayuda
    		"_crearRemline" : "Make remline", 
    		"_crearRemlineInfo" : "You can create new timelines by clicking on 'New Story'. And choose how to get the event data.", 
    		"_verModRemline" : "View and modify remlines", 
    		"_verModRemlineInfo" : "And add new events in '+ event'.",
		"_verModRemlineInfo2" : "You can see the stories already created and modify them 'select a story'.",
		//footer
		"_footer" : "Remline is a project oriented to the creation of dynamic timelines from data obtained in different ways.",
		//modalHistoria
    		"_addHistoria" : "Add story:",
    		"_modHistoria2" : "Modify story:",
    		"_nombre" : "Name",
    		"_descripcion" : "Description",
    		"_selecForma" : "Select a way to enter your new story data:",
		"_explicaCSV" : "To load a new story from a CSV file, the following format must be used(One line per event):",	
		"_explicaCSV1" : "First line -> nombre,descripcion,fecha,tipo,relevancia,url ",	
		"_explicaCSV2" : "Example line (event) -> Birth,Day on ...,21/04/1994,Personal,1,http://www ... ",	
		"_explicaCSV3" : "Select a file",	
		//modalSuceso
    		"_addSuceso" : "Add event:",
    		"_modSuceso" : "Modify event:",
    		"_tipo" : "Type",
    		"_fecha" : "Date",
    		"_coste" : "Relevance",
    		"_costeInfo" : "Importance of the event",
    		"_costeNormal" : "1 - Normal",
    		"_costeImportante" : "2 - Important",
    		"_costeMuyImportante" : "3 - Very Important",
    		"_media" : "Media",
    		"_mediaInfo" : "Follow the format:",
    		"_mediaInfo2" : "http://www.yourLink.com",
		//botonesModales
    		"_aceptar" : "Ok",
    		"_cerrar" : "Cancel",
    		"_eliminarHistoria" : "Remove Story",
    		"_eliminarSuceso" : "Remove Event",
		"_cargarArchivo" : "Upload file",
		"_botonManual" : "Enter data manually",
		"_botonCSV" : "From CSV file"

  	});
  	$translateProvider.preferredLanguage('es');
});



