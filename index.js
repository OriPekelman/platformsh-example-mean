// Load the http module to create an http server.
var http = require('http');
var config= require("platformsh").config();

var mongoose = require('mongoose');

// Mongoose connection to MongoDB 
mongoose.connect('mongodb://'+ config.relationships.mongodb[0]["username"]+':'+config.relationships.mongodb[0]['password']+ "@" + config.relationships.mongodb[0]['host']+ ":" + config.relationships.mongodb[0]['port']+ '/' + config.relationships.mongodb[0]['path'], function (err) {
  if (err) {
    if (err) console.log(err);
  }
});

var thingSchema = new mongoose.Schema({
  title: { type: String }
});
var Thing = mongoose.model('Thing', thingSchema);
var foo = new Thing({
  title: 'Platform.sh'
});
foo.save(function(err, thor) {
    if (err) console.log(err);
});
Thing.find({}, function(err, foo) {
  if (err) {console.log(err) } else { resp = JSON.stringify(foo) };
});


var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.end("<html><head></head><body><code>"+ resp +"</code><br><code>"+JSON.stringify(config) + "</code><img src='js.png'></body></html>");
});

server.listen(config.port);

// Put a friendly message on the terminal
console.log("Server running port: " + config.port);