var express = require('express');

module.exports = function(app){
  app.get('/api', function(req, res){
    res.json({message: 'get request'});
  });

  app.post('/api', function(req, res){
    console.log(req.body);
    res.json({message: 'post request'});
  });
}
