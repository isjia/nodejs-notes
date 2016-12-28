var express = require('express');
var morgan = require('morgan');

var hostname = 'localhost';
var port = 3100;

var app = express();

app.use(morgan('dev'));

function auth(req, res, next){
  var authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader){
    var err = new Error('You are not authenticated!');
    err.status = 401;
    next(err);
    return;
  }

  var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
  var user = auth[0];
  var pass = auth[1];
  console.log("test print auth var： " + auth);

  if (user == 'admin' && pass == 'password') {
    next(); //authorized
  }
  else {
    var err = new Error('You are not authenticated!');
    err.status = 401;
    next(err);
  }
}

app.use(auth);

app.use(express.static('./public'));
app.use(function(err, req, res, next){
  res.writeHead(err.status || 500, {
    'WWW-Authenticate': 'Basic',
    'Content-Type': 'text/plain'
  });
  res.end(err.message);
});

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}`);
});
