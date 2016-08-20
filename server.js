var express = require('express');

var port = process.env.port || 1337;

var hostname = 'localhost';

var app = express();

app.use(express.static('public'));

var server = app.listen(port, hostname, function() {
  var host = server.address().address;
  console.log('Server is running at http://%s:%s', host, port);
});