// Load the http module to create an http server.
var http = require('http');
// Load platform.sh configuration from the environment
var config= require("platformsh").config();

var mongoose = require('mongoose');

// Mongoose connection to MongoDB 
var db = config.relationships.first_db[0]
mongoose.connect('mongodb://'+ db["username"]+':' + db['password']+ "@" + db['host']+ ":" + db['port']+ '/' + db['path'], function (err) {
  if (err) {
    if (err) console.error(err);
  }
});

var thingSchema = new mongoose.Schema({
  title: { type: String }
});
var Thing = mongoose.model('Thing', thingSchema);
var foo = new Thing({
  title: 'Platform.sh'
});
foo.save(function(err, foo) {
    if (err) console.error(err);
});
Thing.find({}, function(err, foo) {
  if (err) { console.error(err) } else { resp = JSON.stringify(foo, null, 4) };
});


var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.end("<html><head></head><body><h1><img src='js.png'>Hello node</h1><pre>"+ resp +"</pre><br><pre>" + JSON.stringify(config, null, 4) + "</pre></body></html>");
});

server.listen(config.port);

// Put a friendly message on the terminal this will end up in the log
console.log("Server running port: " + config.port);