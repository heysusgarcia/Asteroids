var sum = function() {
 var nums = Array.prototype.slice.call(arguments);
 var total = 0;
 nums.forEach(function(num) {
   total += num; 
 });
 return total;
};

// console.log(sum(1, 2, 4, 5, 6, 1, 23));

Function.prototype.myBind = function(context) {
  var func = this;
  return function() {
    var args = Array.prototype.slice.call(arguments);
    return func.apply(context, args);
  };
};

var myObj = {name: "Peter"};
var myFunction = function() {
  var args = Array.prototype.slice.call(arguments);
  console.log(this.name + " " + args);
};

var myBoundFunction = myFunction.myBind(myObj, 1, 2);
myBoundFunction(3);