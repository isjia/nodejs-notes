var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser')

var hostname = 'localhost';
var port = 3100;

var app = express();

app.use(morgan('dev'));
app.use(cookieParser('1234567890-0987654321')); // secret key

function auth(req, res, next){
  if (!req.signedCookies.user) {
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
      res.cookie('user', 'admin', {signed: true});
      next(); //authorized
    }
    else {
      var err = new Error('You are note authenticated!');
      err.status = 401;
      next(err);
    }
  }
  else {
    if (req.signedCookies.user === 'admin') {
      next();
    }
    else {
      var err = new Error('You are not authenticated!');
      err.status = 401;
      next(err);
    }
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
