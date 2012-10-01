// xxxxxxxxxxxxxxxxxxxxx Cirrus.js xxxxxxxxxxxxxxxxxxxxxxxx
function App(){this.router={params:{body:{}},parse_params:function(a){for(var b=a.length;b--;){var c=a[b].split("=");this.params[c[0]]=c[1].replace(/\+/g," ")}},routes:{},addRoutes:function(a){for(var b=Object.keys(a),c=b.length;c--;)if("resource"==b[c].split(" ")[0]){var d=this.createREST(b[c].split(" ")[1]);this.addRoutes(d)}else{var d={},e=b[c];d[e]=a[e];this.routes[e.replace(/:\w+/g,"(\\d+)")]=d}},createREST:function(a){var b={};b["GET /"+a]=a+"Controller#index";b["GET /"+a+"/new"]=a+"Controller#new";
b["POST /"+a]=a+"Controller#create";b["GET /"+a+"/:id"]=a+"Controller#show";b["GET /"+a+"/:id/edit"]=a+"Controller#edit";b["PUT /"+a+"/:id"]=a+"Controller#update";b["DELETE /"+a+"/:id"]=a+"Controller#delete";return b},pointRequest:function(a){keys=Object.keys(this.routes);for(var b=keys.length;b--;){var c=RegExp(keys[b].replace(/\//g,"\\/")+"$");if(a.match(c)){var d=this.routes[keys[b]],e=Object.keys(d)[0],f=e.match(/:(\w+)/g);if(f){a=a.match(c);a.shift();for(b=f.length;b--;)c=f[b],this.params[c.replace(":",
"")]=a[f.indexOf(c)]}return d[e]}}return"NOT FOUND"}};this.params=this.router.params}App.prototype.extend=function(a,b){var b=b||this,c;for(c in a)b[c]=a[c];return b};wApp=new App;
function Request(a){var b=a.split("\r\n\r\n"),c=b[0].split("\r\n"),a=c[0].trim().split(" ");c.shift();a={verb:a[0],path:a[1],protocol:a[2],url:a[1].split("?")[0],encodeParams:a[1].split("?")[1],headers:{},body:{}};if(0!=c.length)for(var d=c.length;d--;){var e=c[d].split(":");a.headers[e[0].trim()]=e[1].trim()}if(2==b.length&&""!=b[b.length-1]){a.body=decodeURIComponent(b[1].trim());b=a.body.split("&");c=b.length;for(wApp.router.params.body={};c--;)d=b[c].split("="),wApp.router.params.body[d[0]]=d[1].replace(/\+/g,
" ")}"undefined"!=typeof a.encodeParams&&wApp.router.parse_params(decodeURIComponent(a.encodeParams).split("&"));return a}function Response(a){a=wApp.router.pointRequest(a.verb+" "+a.url);"NOT FOUND"!=a?(a=a.split("#"),a=renderResponse(a[0],a[1])):a="HTTP/1.1 404 NOT FOUND";return a}
function renderResponse(a,b){var c=wApp[a][b](wApp.router.params),d=wApp.router.params.callback,c=d?d+"("+JSON.stringify(c)+")":JSON.stringify(c),c=unescape(encodeURIComponent(c));return"HTTP/1.1 200 OK\r\n"+["Date: "+(new Date).toGMTString(),"Content-Type: application/"+(d?"javascript":"json")+"; charset=utf-8","Content-Length: "+c.length,"Server: Velneo v7\r\ntransfer-coding: chunked\r\nKeep-Alive: timeout=5, max=94\r\nConnection: Keep-Alive"].join("\r\n")+"\r\n\r\n"+c};
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// xxxxxxxxxxxxxxxxxxxxx Tu Código va aqui xxxxxxxxxxxxxxxx

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
