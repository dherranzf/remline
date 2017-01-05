
//----------------------------------------------------------------------------------------------------------------------------
// Directiva para pintar Timeline con D3JS
//----------------------------------------------------------------------------------------------------------------------------


app.directive('ghVisualization', function () {




  	return {
	    restrict: 'E',
	    scope: {
	      val: '=',
	      suceso: '='
	},
	link: function (scope, element, attrs) {


	    // Dimensiones de canvas/dibujo
	    var margin = {top: 30, right: 20, bottom: 30, left: 80},
	    width = 0.85*(parseInt((d3.select('#chart').style('width')), 10)),
        width = width - margin.left - margin.right,
	    height = 270 - margin.top - margin.bottom;

		// Parsear fecha
		var parseDate = d3.timeFormat("%d-%b-%Y");

		// Rangos de x e y
		var c10 = d3.scaleOrdinal(d3.schemeCategory10);
		var x = d3.scaleTime().range([0, width])/*.domain([new Date(2000, 0, 1, 0), new Date(2020, 0, 1, 2)])*/;
		var y = d3.scaleBand().range([height,0]);

		// Definimos axis
		var xAxis = d3.axisBottom(x)
		    .ticks(5);

		var yAxis = d3.axisLeft(y)
			.tickFormat("");

		var yAxisLetras = d3.axisLeft(y);

		var yAxisGrid = d3.axisLeft(y)
		    .tickSizeInner(-width)
		    .tickSizeOuter(0)
		    .tickPadding(10)
		    .tickFormat("");

		// Definimos las lineas
		var valueline = d3.line()
		    .x(function(d) { return x(new Date(d.fecha)); })
		    .y(function(d) { return y(d.tipo); })
		    .curve(d3.curveMonotoneX)
		var valueline2 = d3.line()
		    .x(function(d) { return x(new Date(d.fecha))*1.01; })
		    .y(function(d) { return y(d.tipo)*1.01; })
		    .curve(d3.curveMonotoneX)
		var valueline3 = d3.line()
		    .x(function(d) { return x(new Date(d.fecha))*0.99; })
		    .y(function(d) { return y(d.tipo)*0.99; })
		    .curve(d3.curveMonotoneX)

		// Definimos 'div' tooltips
		var div = d3.select("body")
		    .append("div")  // declare the tooltip div 
		    .attr("class", "tooltip")
		    .style("opacity", 0);

	     	// svg y g
	    	var vis = d3.select(element[0])
			.append("svg")
				.attr("width", width + margin.left + margin.right)
			 	.attr("height", height + margin.top + margin.bottom)
	   		 .append("g")
				.attr("transform", 
			      	"translate(" + margin.left + "," + margin.top + ")");

     	 scope.$watch('val', function (newVal, oldVal) {

		console.log("empieza watch: val=");
		console.log(newVal);
		console.log(oldVal);

		// borramos elememtos 
		vis.selectAll('*').remove();

		// si no existe newVal salimos
		if (!newVal) {
		  return;
		}

		//ordenamos por fechas
		function comparaFechas(a, b) {
		    return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
		}
		newVal.sort(comparaFechas);


		//parseamos fechas
		newVal.forEach(function(d) {
			//d.fecha = parseDate(d.fecha);
			//d.fecha = parseDate(new Date(d.fecha));
			d.tipo = d.tipo;
		});


       		// Definimos los dominios        

		var minD = d3.min(newVal, function(d) { return new Date(((new Date(d.fecha)).getTime())-50*24*60*60*1000); });
		//new Date(theDate.getTime() + days*24*60*60*1000); le resto media año para que no quede pegado al eje el 1er punto
		var maxD = d3.max(newVal, function(d) { return new Date(d.fecha); });
		x.domain([minD,maxD]);
        
		//y.domain([0, d3.max(newVal, function(d) { return d.tipo; })]);
		console.log(newVal.map(function(d) { return d.tipo; }));
		y.domain(newVal.map(function(d) { return d.tipo; }));



		// Añdimos los valueline path.
		vis.append("path")
		     .attr("opacity", "0")
	   	     .transition()
		     .delay(2000)
		     .duration(3000)
		     //.ease('quad-out')
		     .attr("stroke-dashoffset", 0)
		     .attr("opacity", "1")
		     .attr("class", "line")
		     .attr("d", valueline(newVal));
		// Añdimos los valueline path
		vis.append("path")
		   .attr("class", "line")
		   .attr("opacity", "0")
		   .style("stroke", "white")
	   	   .transition()
		   .delay(2000)
		   .duration(3000)
		   .style("stroke-width", 1)
		   .attr("opacity", "1")
		   .attr("d", valueline2(newVal));
		// Añdimos los valueline path
		vis.append("path")
		   .attr("class", "line")
		   .attr("opacity", "0")
	   	   .style("stroke", "grey")
		   .transition()
		   .delay(2000)
		   .duration(3000)
		   .style("stroke-width", 1)
		   .attr("opacity", "1")
		   .attr("d", valueline3(newVal));

		// Añadimos los puntos
		vis.selectAll("dot")
		    .data(newVal)
		  .enter().append("circle")
		    .attr("r", function(d) { return 0; })
		    .attr("class", "circleOut")	
		    .attr("cx", function(d) { return x(new Date(d.fecha)); })
		    .attr("cy", function(d) { return y(d.tipo)})



     	 	// Eventooos
      	   	.on("mouseover", function(d) {        
			     div.transition()
			        .duration(500)    
			        .style("opacity", 0);
		       	     div.transition()
		       	         .duration(200)    
		       	         .style("opacity", 0.9); 
			     div.style("display","block");   
		       	     div.html(
		       	         '<a href= "'+d.media+'" target="_blank">' + //with a link
		       	         parseDate(new Date(d.fecha)) +
		       	         "</a>" +
				 "<br/>"  + d.nombre)     
		       	         .style("left", (d3.event.pageX) + "px")             
		       	         .style("top", (d3.event.pageY-50) + "px")
				 .style("background-color", "white")
		 		 .style("border", "1px solid #30b5f2")
		 		 .style("height", "35px") 
	  			 .style("width", "150px");
			     d3.select(this).attr("r", function(d) { return 5+parseInt(d.coste); }).attr("class", "circleOn");
       	   	})
      	    	.on("mouseout", function(d) {        
        	     div.style("display","none");   
	       	     div.html('<a>quitar</a>');
		     d3.select(this).attr("r", function(d) { return 3+parseInt(d.coste); })
			    .attr("class", function(d) { if(scope.suceso!="" & d.nombre==scope.suceso.nombre) return "circleOn"; else return"circleOut";});
       	    	 })
      	    	.on("click", function(d) {        
		     console.log("Clickkkkk ON");
		     scope.$apply(function(){
			  scope.suceso=d;
		      });
		     console.log(scope.suceso);
		     d3.selectAll("circle")
		    	   .attr("class", function(d) { if(scope.suceso!="" & d.nombre==scope.suceso.nombre) return "circleOn"; else return"circleOut";});

       	    	 })
   	   	 .transition()
	     	 .delay(function(d, i) {return i * 100; })
	    	 .duration(2000)
	   	 .attr("r", function(d) { return 3+parseInt(d.coste); })

		// x Axis
		vis.append("g")
		    .attr("class", "x axis")
		    .attr("transform", "translate(0," + height + ")")
		    .call(xAxis);

		// y Axis
		vis.append("g")
		    .attr("class", "y axis")
		    .call(yAxis);
		// y Axis Letras
		vis.append("g")
		    .attr("class", "nopath")
		    .attr("transform", "translate(0,-30)")
		    .call(yAxisLetras);
		// y Axis GRID
		vis.append("g")
		    .attr("class", "grid")
		    .call(yAxisGrid);

        /*d3.select(window).on('resize', resize);
        function resize() {
            width = 0.85*(parseInt((d3.select('#chart').style('width')), 10));
            width = width - margin.left - margin.right;

        }*/

      });
    }
  }
});
