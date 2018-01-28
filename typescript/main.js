// function log(message) {
//   console.log(message);
// }
//
// var message = 'Hello World';
//
// log(message);
//////////DECLARING VARIABLES////////////////
//there are two ways of declaring variables var or let
//when using var to declare variables become scoped to the nearest function which in this case is availbe anywhere in the doSomething functions
// function doSomething() {
//   for (var i = 0; i < 5; i++) {
//     console.log(i);
//   }
//   console.log('Finally: ' + i)
// }
//
// doSomething();
//
// //using the let keyword means that the variable is scoped to the nearest block instead
// function doSomethingElse() {
//   for (let i = 0; i < 5; i++) {
//     console.log(i);
//   }
//   console.log('Finally: ' + i)
// }
//
// doSomethingElse();
/////////------------ Different types -------------------////////////////////////
//unlike with js we are unable to changet the type of variable on the fly. Therefore if we declared 'let count = 5' we won't be able to change 'count = 'a'. If we don't know the type of the value ahead of tiem we use type annotations
var a;
var b;
var c;
var d;
var e = [1, 2, 3, 4];
var f = [1, true, 's', false];
//if we are working for example ona group of related constances - this is hat it would look like in vanilla javascript - however very verbose
var ColorRed = 0;
var ColorGreen = 1;
var ColorBlue = 2;
//Instead we use the concept of enum so we can put all the related const in an container
//in terms of values the first const is already assigned 0 and each susbquent constgets an incremnted value so we don't have to explicitely set it however as a good practice to set it
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
var backgroundColor = Color.Red;
/// --------- TYPE ASSERTIONS ----- ////
//when var is definest as a string we are given a range of methods through the intellsence that can be applied to a strin
var message = 'abc';
var upperCase = message.toUpperCase;
/// however if we dont set a value, the intellsence displaying the methods that are associated with strings are no longer in use as we would be working with 'any' type. Therefore we need to typescript complier that we are working witj a string - type assertion
var newMessage;
newMessage = 'abc';
var anotherUpperCase = message.toLowerCase; //this apporach is used more
var alterntaiveUpperCase = message.toLowerCase;
// type assertion does not restructure the type in run time
////---------------- ARROW FUNCTIONC--------------------------///////////
var log = function (message) {
    console.log(message);
};
var doLog = function (message) {
    console.log(message);
};
//if it only has one line
var secondDoLog = function (message) { return console.log(message); };
// if you have no parameters
var thirdDoLog = function () { return console.log(); };
/////// ----- Interfaces and CUSTOM TYPES --------------////
//when working with more complex fucntions with several paramenters, in those situations it is likely that all these paramaters belong to a single concept. For example a car may have several porperties and we wouldn't want to pass each property to a function.
var drawPoint = function (a, b) {
    //..
};
//Instead we incapluate them into an object and only pass that one object
var anotherDrawPoint = function (point) {
    //..
};
/// and here we call the function and define the object with the two properties
anotherDrawPoint({
    x: 1,
    y: 2
});
// if our algorithm is expecting specific properties ie it expects c, y but we enter name, it doesn't return an error and a solutions to this is by using inline annotations - adding custom types - it workd for simple cases but it's still verbose and another function may require the point object therefore we wouldn't want to repeat ourselves
var yetAnotherDrawPoint = function (point) {
    //..
};
yetAnotherDrawPoint({
    x: 1,
    y: 2
});
var lastDrawPoint = function (point) {
    //..
};
lastDrawPoint({
    x: 1,
    y: 2
});
/////////===========CLASSES===============/////////////////
//cohesion - things that are related should be part of one unit so above we have violated teh cohesion rule as the structure of a point is highly related to the function of drawing a point. So they shouldn't be sperated and should be part of a unit whichis called a CLASS.
//Interfaces are purely used for declarations therefore we cannot move our implemations within the     functions. So instead we add a function declaration i.e draw: () => void
var NewPoint = /** @class */ (function () {
    function NewPoint() {
    }
    // unlike Interfaces we can add implementations into classes which we refer to as methods and above x,y are fields
    NewPoint.prototype.draw = function () {
        console.log('X: ' + this.x + 'Y: ' + this.y);
    };
    NewPoint.prototype.getDistance = function (another) {
        //...
    };
    return NewPoint;
}());
/////===== creatiing objects - instances of the class =====////
// working with objects that are using custom types we need to allocate memory to it and this is done by defining a new object
var point = new NewPoint();
point.x = 1;
point.y = 2;
point.draw();
