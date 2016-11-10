var express = require('express');
var Post = require('./models/post');

module.exports = function(app){
  // 获取所有文章
  app.get('/posts', function(req, res){
    Post.find().sort({'updatedAt': -1}).exec(function(err, posts){
      if (err) {
        return res.status(500).json({error: err.message});
      }
      res.json({posts: posts})
    });
  });

  // 创建文章
  app.post('/posts', function(req, res){
    if (req.body.title === ''){
      return res.status(400).json({error: '文章标题不能为空！'});
    }
    var post = new Post();
    for (prop in req.body) {
      post[prop] = req.body[prop];
    }
    post.save(function(err){
      if (err) {
        return res.status(500).json({error: err.message});
      }
      res.json({
        message: '文章创建成功！'
      });
    });
  });

  // 读取文章
  app.get('/posts/:post_id', function(req, res){
    Post.findById({_id: req.params.post_id}, function(err, post){
      if (err){
        return res.status(500).json({error: err.message});
      }
      res.json({post: post});
    });
  });

  // 更新文章
  app.put('/posts/:post_id', function(req, res){
    Post.findById({_id: req.params.post_id}, function(err, post){
      if (req.body.title === '') {
        return res.status(400).json({error: '文章标题不能为空！'});
      }
      for (prop in req.body){
        post[prop] = req.body[prop];
      }
      post.save(function(err){
        if (err) return res.status(500).json({error: err.message});
        res.json({message: '文章更新成功了！'});
      });
    });
  });

  // 删除文章
  app.delete('/posts/:post_id', function(req, res){
    Post.findById({_id: req.params.post_id}, function(err, post){
      if (err) return res.status(500).json({error: err.message});
      post.remove(function(err){
        if (err) return res.status(500).json({error: err.message});
        res.json({message: '文章已经删除了！'});
      });
    });
  });
}
