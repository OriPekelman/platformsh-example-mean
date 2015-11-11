// Load the http module to create an http server.
var http = require('http');
var config= require("platformsh").config();

var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.end("<html><head><title>Hello node</title></head><body><h1>Hello Node</h1><br><h3>Platform configuration:</h3><code>"+JSON.stringify(config, null, 4) + "</code><img src='/js.png'></body></html>");
});

server.listen(config.port);