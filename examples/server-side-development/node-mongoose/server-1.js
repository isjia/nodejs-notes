var mongoose = require('mongoose');
var assert = require('assert');

var Dishes = require('./models/dishes-1');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  // we are connected!
  console.log("Connected correctly to server.");

  // create a new dish
  var newDish = Dishes({
    name: 'A New Dish',
    description: 'A New Dish description'
  });

  // save the dish
  newDish.save(function(err){
    if (err) {
      throw err;
    }
    console.log('Dish created');

    // get all dishes
    Dishes.find({}, function(err, dishes){
      if (err) throw err;

      // object of all the dishes
      console.log(dishes);
      db.collection('dishes').drop(function(){
        db.close();
      });
    });
  });
});
