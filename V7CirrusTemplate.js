
	// Definicion del controlador
	wApp.helloController = {
	    sayHello: function(params){
	        return({mensaje: "Hola Mundo"});
	    }
	}

	// Creando las rutas
	wApp.addRoutes({"GET /hello": "hello#sayHello"})

// xxxxxxxxxxxxxxxxxxxxxxxxx End  xxxxxxxxxxxxxxxxxxxxxxxxxx

//Procesando los requests
var request = theRoot.varToString("REQUEST")
theRoot.setVar("RESPONSE", Response(Request(request)))
