var mongoose = require('mongoose');
var assert = require('assert');

var Dishes = require('./models/dishes-1');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  // we're conencted
  console.log("Connected correctly to server.");

  // create a new dish
  Dishes.create({
    name: 'dish name 2',
    description: 'dish discription'
  }, function(err, dish){
    if(err) throw err;
    console.log('Dish created!');
    console.log(dish);

    var id = dish._id;

    // git all the dishes
    setTimeout(function(){
      Dishes.findByIdAndUpdate(id, {
        $set: {
          description: 'updated description'
        }
      },
      { new: true})
      .exec(function(err, dish){
        if(err) throw err;
        console.log("Updated Dishes!");
        console.log(dish);

        db.collection('dishes').drop(function(){
          db.close();
        });
      })
    }, 3000);
  });
});
