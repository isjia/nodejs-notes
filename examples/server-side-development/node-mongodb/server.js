var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var dbOps = require('./operations');

// Connetion URL
var url = 'mongodb://localhost:27017/conFusion';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db){
  assert.equal(err, null);
  console.log("Connected correctly to server");

  dbOps.insertDocument(db, { name: "Vadonut", description: "Test" },
    "dishes", function(result){
      console.log(result.ops);

      dbOps.findDocuments(db, "dishes", function(docs){
        console.log(docs);

        dbOps.updateDocument(db, { name: "Vadonut" },
          { description: "Updated Test" }, "dishes", function(result){

            console.log(result.result);

            dbOps.findDocuments(db, "dishes", function(docs){
              console.log(docs);

              db.dropCollection("dishes", function(result){
                console.log(result);
                db.close();
              });
            });
          });
      });
    });
});

