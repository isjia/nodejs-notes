var express = require('express');
var morgan = require('morgan');

var hostname = 'localhost';
var port = 3100;

var app = express();

app.use(morgan('dev'));

app.use(express.static('./public'));

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}`);
});
