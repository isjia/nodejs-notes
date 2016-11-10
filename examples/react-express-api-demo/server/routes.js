var express = require('express');
var Post = require('./models/post');

module.exports = function(app){
  app.get('/posts', function(req, res){
    Post.find().sort({'createdAt': -1}).exec(function(err, posts){
      if (err) {
        return res.status(500).json({error: err.message});
      }
      res.json({posts: posts})
    });
  });

  app.post('/api', function(req, res){
    console.log(req.body);
    res.json({message: 'post request'});
  });
}
