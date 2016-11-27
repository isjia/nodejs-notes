// var rect = {
//   perimeter: function(x,y){ return 2*(x+y) },
//   area: function(x,y) { return x*y }
// };

// var rect = require('./rectangle-2');

// var Rect = require('./rectangle-1');
// var rect = new Rect();

var argv = require('yargs')
        .usage('Usage: node $0 --l=[num] --b=[num]')
        .demand(['l', 'b'])
        .argv;

var rect3 = require('./rectangle-3')

function solveRect(l,b){
  console.log("Solving for rectangle with l = " + l + " and b = " + b);

  if (l < 0 || b < 0) {
    console.log("Error");
  }
  else {
    console.log("The area is " + rect.area(l, b));
    console.log("The perimeter is " + rect.perimeter(l,b));
  }
}

function solveRect3(l, b){
  console.log("Solving rect 3 ...");
  rect3(l, b, function(err, r){
    if (err){
      console.log(err);
    }
    else {
      console.log("The area is " + r.area());
      console.log("The perimeter is " + r.perimeter());
    }
  })
}

// solveRect3(2,4);
// solveRect3(3,5);
// solveRect3(-3,5);
solveRect3(argv.l, argv.b);
