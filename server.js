var express = require('express');

var port = process.env.port || 1337;

var app = express();

app.use(express.static('public'));

var server = app.listen(port, function() {
    var host = server.address().address;
    
    console.log('Hey... I am at http://%s:%s', host, port)
})