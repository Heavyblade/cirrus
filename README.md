# HTTP-JSON-Server para la plataforma Velneo V7

* http://velneo.es

## Que es ?

Cirrus.js es una implementacion del protocolo HTTP corriendo sobre el objecto TCP/IP de Velneo V7 y que solo retorna JSON, orientada a la construccion de APIS para dar acceso mediante Ajax o http request a aplicaciones desarrolladas sobre esta plataforma.

## Installación.

#### Herencia
Para comenzar a usar Cirrus.js en la carpeta /bin puedes encontrar un archivo .vin el cual podrás instalar dentro de tu Velneo vServer y heredar de este algun proyecto del que desees servir datos web, es decir el webserver debe quedar "por encima" de la aplicación a servir a fin de poder usar las busquedas y procesos de datos de esta.

#### Copia
Si prefieres copiar directamente el servidor dentro de tu aplicación para evitar los incomvenientes de la herencia, copia la carpeta JSON-server dentro de tu solución, crea un script Js y copia el codigo de Cirrus.js dentro de ese script y finalmente asignale ese script al proceso "http-server".

Listo ahora tienes a Cirrus.js disponible.

## Uso rapido

Hola Mundo usando Cirrus.js

```javascript
	// Definicion del controlador
	helloController = {
		sayHello: function(params){
			return({mensaje: "Hola Mundo"});
		}
	}

	// Añadiendo el controlador a tu App
	wApp.extend({ helloController: helloController })

	// Creando las rutas
	wApp.addRoutes({"GET /hello": "hello#sayHello"})
```

Inicio objecto TCP en el puerto 3000

```bash
	>> curl http://localhost:3000/hello 
	"{"mensaje":"Hola Mundo"}"
```


## Modo de uso.

Cirrus.js es mas que simplemente un parseador de request HTTP te da una estructura para que organices tu codigo y no tengas que liarte con el ruteo y parametros, funcionalidad que esta embebida dentro del objeto wApp, el cual englobla los datos de aplicación que quieres exponer.

#### Definicion de rutas:

Dado que Cirrus.js se encarga de todo el parseo y organizacion del request HTTP por tí, tu solo tienes que encargate de ordenar tus rutas y controladores para el manejo de las peticiones.


```javascript
wApp.addRoutes({"GET /users": "users#index", "GET /users/new": "users#new"})
```
con la anterior sentencia estas enviando las peticiones GET dirigidas al path "/users" hacia el controlador usersController en la acción "index"

##### Define parametros:

puedes definir parametros dentro de tus urls con el fin de darles un enfoque mas REST y que tengas mas sentido al leerlas.

```javascript
wApp.addRoutes({"GET /users/:id": "users#show"})
```

En esta ruta cuando llegue un request "/users/20" el "20" será añadido a la lista global de parametros de los que puedes disponer atraves de la variable params en los controladores que definas.

Adicional a esta definicion Cirrus.js parseara cualquier para metro extra añadido al final de la URL siguiendo el formato definido para HTTP URL?param1=value1&param2=value2 y los añadira a la lista global de parametros.

#### Soporte REST:

Si dispones de un recurso (ususarios, facturas, articulos, categorias, etc) y quieres evitarte construir las rutas para listarlos, crearlos, mostrar espeficos, editarlos, actualizarlos, etc puedes declarar recursos en tus rutas y Cirrus.js creara las 7 rutas REST para ese recurso.

```javascript
wApp.addRoutes({"resource users": "users"})
```
esta declaración añadira automáticamente las siguientes rutas a tu aplicación:

* GET /users
* GET /users/new
* POST /users
* GET /users/:id
* GET /users/:id/edit
* PUT /users/:id
* DELETE /users/:id

## peticiones POST

Puedes realizar peticiones POST o PUT que incluyan datos JSON como parte del la petición dentro del body, estos datos serán parseados y podrás acceder a ellos desde wApp.params.body

## Controladores - Añade tu código

Al igual que en el las estructuras web standar, los controladores son los mediadores entre las paticiones y el acceso a los datos, asi tu definiras controladores para manejar tu logica de negocios y el acceso a los datos del vServer. para añadir logica a tu aplicaciones debes de hacer dos cosas:

1. Crear el controllador
2. Añadir dicho controlador a tu aplicacion (wApp)

#### Crear el controlador:

Para definir el controlador debes de crear un objeto javascript con el nombre del controlador seguido de "Controller", dentro de el definiras metodos que contendran la lógica de negocios y que tendran acceso a la lista de parametros y finalmente el objeto JSOn que representa la respuesta

Definición del controlador

```javascript
usersController = {
	index: function(params){
		return(algun_objeto_json);
	},
	show: function(params){
		return(algun_objeto_json);
	}
}
```

Añade el controlador a tu aplicación:

```javascript
wApp.extend({ usersController: usersController })
```




