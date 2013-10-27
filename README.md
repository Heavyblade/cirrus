# HTTP-Server para la plataforma Velneo V7

Cirrus.js es una implementación en JavaScript del protocolo HTTP corriendo directamente sobre el objecto TCP/IP de Velneo V7, Que permite servir paginas HTML, JSON, Javascript y Css directamente desde una app Velneo v7.

### Para que se usa ?

El propósito es abrir las aplicaciones desarrolladas sobre v7 para que puedan ser aprovechadas en entornos web, logrando de esta forma funcionalidades como pedidos online afectando directamente la app, crear aplicaciones mobile con jQuery Mobile, listar el catalogo de productos, solicitud de citas online e inmuerables posibilidades gracias a que puedes desarrollar webs y API's de acceso a tus datos que pueden ser consumidas mediante paginas html o webservices.

### Indice

* [Router](https://github.com/Heavyblade/cirrus/wiki/Router)
* [Vistas](https://github.com/Heavyblade/cirrus/wiki/Vistas)
* [Controllers](https://github.com/Heavyblade/cirrus/wiki/controllers)
* [Sessiones](https://github.com/Heavyblade/cirrus/wiki/sessiones-y-cookies)


## Instalación

Para comenzar a usar Cirrus.js en la carpeta /bin puedes encontrar un archivo .vin el cual podrás instalar dentro de tu Velneo vServer y heredar en este algún proyecto del que desees servir datos web, es decir el webserver debe quedar "por encima" de la aplicación a servir a fin de poder usar las busquedas y procesos de datos de pertenecientes a esta.

Listo ahora tienes a Cirrus.js disponible y solo debes iniciar el objeto TCP en el plano y puerto de ejecucuón en el que lo desees usar.

## Uso rápido

"Hola Mundo" usando Cirrus.js

```javascript
	// Definicion del controlador
	wApp.helloController = {
		sayHello: function(params){
			return({mensaje: "Hola Mundo"});
		}
	}

	// Creando las rutas
	wApp.router.addRoutes({"GET /hello": "helloController#sayHello"})

	//Procesando los requests
	var request = theRoot.varToString("REQUEST")
	theRoot.setVar("RESPONSE", Response(Request(request)))
```

Inicio objecto TCP en el puerto 3000 y pruebo:

```bash
	>> curl -i -H "Accept: application/json" http://localhost:4000/hello
	"{"mensaje":"Hola Mundo"}"
```
### FAQ's

#### y el front end HTTP server ?

Si vas a desarrollar una AppWeb o un sitio web que vas a necesitar un servidor web que se encargue de la concurrencia, assets, caché y demas, para ello puedes usar Apache o Nginx y configurar proxys inversos o load balancers de tal forma que sean capaces de servir archivos estáticos cuando existan o que redirija peticiones http hacia el vServer cuando se pidan datos dinámicos.

#### es Cirrus.js equivalente a vModApache ?

No, vModApache es un modulo especializado para acceso a vServers desarrollado directamente por Velneo S.A y su función es mas parecida a las funcionalidades CGI; Cirrus.js por el contrarío pretende ser directamente un HTTP server orientado la creación de API's y que puede ser complementado con Nginx o Apache para obtener lo mejor de ambos mundos.

#### Consume Cirrus.js enganches al vServer?

No, Cirrus.js corre directamente sobre las conexiones que permite el objeto TCP de v7 y no realiza una conexion VATP con el vServer.

#### es Cirrus.js multiplataforma ?

Si claro, al correr directamente sobre el objeto TCP de v7 correra en cualquier plataforma donde el vServer tenga capacidad de ejecutarse.

### Quieres contribuir ?

Para contribuir a Cirrus.js, clona el repositorio, verifica que todos los specs pasan (abre el archivo spec/SpecRunner.html), no existen dependencias y simplemente puedes revisar el código y realizar pull request al repositorio para añadir funcionalidades faltantes o corregir bugs encontrados.

Dispones además dentro de la suite de Jasmine.js de un apartado donde puedes tester el performance de tus cambios o adiciones utilizando para ello la librería Benchmark.js.

## Licencia

Cirrus.js es liberado bajo las directivas de la licencia MIT

* http://www.opensource.org/licenses/MIT