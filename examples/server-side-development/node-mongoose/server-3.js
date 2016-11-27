var mongoose = require('mongoose');
var assert = require('assert');

var Dishes = require('./models/dishes-3');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
  // we're connected!
  console.log("Connected correctly to server!");

  // create a new dish
  Dishes.create({
    name: 'new dish 2',
    description: 'test description',
    comments: [{
      rating: 3,
      comment: '3 star comment',
      author: 'me'
    }]
  }, function(err, dish){
    if (err) throw err;
    console.log('Dish created!');
    console.log(dish);

    var id = dish._id;

    // get all the dishes
    setTimeout(function(){
      Dishes.findByIdAndUpdate(id, {
        $set: {
          description: 'Updated description'
        }
      }, {
          new: true
        }).exec(function(err, dish){
        if (err) throw err;
        console.log("updated Dish!")
        console.log(dish);

        dish.comments.push({
          rating: 5,
          comment: 'im a comment',
          author: 'whatever'
        });

        dish.save(function(err, dish){
          console.log('add comment!');
          console.log(dish);

          db.collection('dishes').drop(function(){
            db.close();
          })
        })
      })
    }, 3000)
  })
})
