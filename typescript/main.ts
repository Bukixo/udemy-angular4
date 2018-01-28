// function log(message) {
//   console.log(message);
// }
//
// var message = 'Hello World';
//
// log(message);

//////////DECLARING VARIABLES////////////////

//there are two ways of declaring variables var or let
//when using var to declare variables become scoped to the nearest function which in this case is available anywhere in the doSomething functions

function doSomething() {
  for (var i = 0; i < 5; i++) {
    console.log(i);
  }
  console.log('Finally: ' + i)
}

doSomething();

//using the let keyword means that the variable is scoped to the nearest block instead
//that way we can catch any error before compile time
//compiles code into es5 code which is supportted by all other browers thats why in the js we would see var rather than let

function doSomethingElse() {
  for (let i = 0; i < 5; i++) {
    console.log(i);
  }
  console.log('Finally: ' + i)
}

doSomethingElse();


/////////------------ Different types -------------------////////////////////////

//unlike with js we are unable to change the type of variable on the fly.
//Therefore if we declared 'let count = 5' we won't be able to change 'count = 'a'.
// If we don't know the type of the value ahead of time we use type annotations

let a: number;
let b: boolean;
let c: string;
let d: any;
let e: number[] = [1,2,3,4];
let f: any[] = [1, true, 's',false];

//if we are working for example ona group of related constances - this is what it would look like in vanilla javascript - however very verbose

const ColorRed = 0;
const ColorGreen = 1;
const ColorBlue = 2;

//Instead we use the concept of enum so we can put all the related const in an container
//in terms of values the first const is already assigned 0 and each susbquent constgets an incremnted value so we don't have to explicitely set it however as a good practice to set it

enum Color { Red = 0, Green = 1, Blue = 2};
let backgroundColor = Color.Red;

/// --------- TYPE ASSERTIONS ----- ////

//when var is defined as a string we are given a range of methods through the intellsence that can be applied to a strin
 let message = 'abc'
 let upperCase = message.toUpperCase;

//however sometimes typescriptcan be confused with the type of the variable
//however if we dont set a value, the intellsence displaying the methods that are associated with strings are no longer in use as we would be working with 'any' type.
//Therefore we need to typescript complier that we are working witj a string - type assertion
 let newMessage
 newMessage = 'abc' //by default if we dont set a value it's type any
 let anotherUpperCase = (<string>message).toLowerCase; //this apporach is used more
 let alterntaiveUpperCase = (message as string).toLowerCase;

// type assertion does not restructure the type in run time it donly tells typescipt
//the type of varbale that way e can access the intellsence


////---------------- ARROW FUNCTIONC--------------------------///////////

//javascript way
let log = function(message) {
  console.log(message);
}

//tyepscipt way - no function keyword
let doLog = (message) => {
  console.log(message);
}
//if it only has one line
let secondDoLog = (message) => console.log(message);

// if you have no parameters
let thirdDoLog = () => console.log();


/////// ----- Interfaces and CUSTOM TYPES --------------////

//when working with more complex fucntions with several paramenters, in those situations it is likely that
//all these paramaters belong to a single concept. For example a car may have several porperties and we
//wouldn't want to pass each property to a function.
let drawPoint = (a, b) => {
  //..
}

//Instead we incapluate them into an object and only pass that one object
let anotherDrawPoint = (point) => {
  //..
}
/// and here we call the function and define the object with the two properties
anotherDrawPoint({
  x: 1,
  y: 2
})

// if our algorithm is expecting specific properties ie it expects c, y but we enter name,
//it doesn't return an error and a solutions to this is by using inline annotations - adding custom types - it workds
//for simple cases but it's still verbose and another function may require
//the point object therefore we wouldn't want to repeat ourselves

let yetAnotherDrawPoint = (point: { x: number, y: number }) => {
  //..
}

yetAnotherDrawPoint ({
  x: 1,
  y: 2
})

//those cases an Interface may be the best solution
// we define an Interface and define the shape of the object

interface Point {
  x: number,
  y: number
}
let lastDrawPoint = (point: Point) => {
  //..
}
lastDrawPoint ({
  x: 1,
  y: 2
})


/////////===========CLASSES===============/////////////////

//cohesion - things that are related should be part of one unit so above we have violated
//the cohesion rule as the structure of a point is highly related to the function of drawing a point.
// So they shouldn't be sperated and should be part of a unit whichis called a CLASS.
//Interfaces are purely used for declarations therefore we cannot move our implemations within the functions.
//So instead we add a function declaration i.e draw: () => void

class NewPoint { //to apply to cohesion rule we changed this to class
  x: number;
  y: number; // these are fields
  // unlike Interfaces we can add implementations into classes which we refer to as methods and above x,y are fields
  draw() {
    console.log('X: '+ this.x + 'Y: '+ this.y);
  }
  getDistance(another: NewPoint) { // this is a method
    //...
  }
}

// The fields and methods are memebers of a this specific class.

/////===== creatiing objects - instances of the class =====////

// working with objects that are using custom types we need to allocate memory to it and this is done by defining a new object
let newpoint = new NewPoint();
newpoint.x = 1;
newpoint.y = 2;
newpoint.draw();

////////////============ Constructors =============//////////////////////////

//Now looking at the object above that we've initalised, we can see that it is quite verbose as we have quite
//a few lines to create the object in a valid state, and i would be worse if we had more lines
//Constructors help us refactors this
//It is a methos that is called when we create an instance of that class

class SecondPoint {
  x: number;
  y: number;

  constructor(x: number, y: number){
    this.x = x;
    this.y = y
  }
  //If we want to create an object without setting values or if we are unsure on the values, we can't set more than one constructor.
  //so solution is to make paramteters optional with '?'.
  //if you make a parameter optional, all the parameters on the right should be optional too

  draw() {
    console.log('X: '+ this.x + 'Y: '+ this.y);
  }
}

let secondpoint = new SecondPoint(1, 2); //when creating new objects we need to supply the values that we have created in the constructors
secondpoint.draw();

//that way we can simplyfy the code and remove the extra line


/////=============ACCESS MODIFIERS ===============////////////

//Access Modifiers give us the ability whereby if we initialize an object we shouldn't be able to change the vaue of it's corodintes
//This makes programmes more predictable and more likely to prevent bugs
//Using typescript's Access modifiers, which are 'Public', 'Private', and 'Protected' provides a solution to this issue.
//Public and Private are the most common and by default all memebrs are public.
// So as it's public and we are able to access all the memenbers (2 fields which are x and y and one method - draw method, or properties) on the intelliSense
//by prefixing a field or method with the 'private' keyword we restrict the access of the member

class ThirdPoint {
  private x: number;
  y: number;

  constructor(x: number, y: number){
    this.x = x;
    this.y = y
  }

  draw() {
    console.log('X: '+ this.x + 'Y: '+ this.y);
  }
}

let thirdpoint = new ThirdPoint(1, 2);
thirdpoint.x = 3 //compilation error - unable to change the corodinate.
thirdpoint.draw();

//Overall, Access Modifiers warrants us to control to certain members of a class form the outside


///==================== Access Modifiers in Constructors parameters ================== /////////////

class FourthPoint {
  // x: number;
  // y: number; We can delete these two fields here and prefix the parameters with access modifiers inside the constructor
  //but if it is public we need to add it

  constructor( private x: number, private y: number){
    //tyepscipt compiler will then generate this field for us. therefore we can delete
    // this.x = x;
    // this.y = y
    // as we would jusyt eb repeating ourselves
  }

  draw() {
    console.log('X: '+ this.x + 'Y: '+ this.y);
  }
}

let fourthpoint = new FourthPoint(1, 2);
fourthpoint.draw();

///////================== Porperties ===================/////////////

// Porperties what are they used for? If you have private fields and you want to have a read only access to the outside
////A solution to this is using property 'get' - getter
//or if you want to give the consumer of thr classes the ability to set values but with ome basic validation.
//In that case property 'set' - setter would be used
//Porperties can be read a fields therefore we use camel case notation.
//To avoid clash with existing fields we use the convention of prefixing underlying fields with an underline
//Porperties look like fields form the outside but internally it's really a method within a class.

class Fifthpoint {

  constructor( private _x: number, private _y: number){
  }

  draw() {
    console.log('X: '+ this._x + 'Y: '+ this._y);
  }

  get x() { //keyword (set/get), name of property, paranthesis
    return this.x;
  } // We have access of all the private members within the class but not outside

  set x(value) {
    if (value < 0)
      throw new Error('Value cannot be less than 0.')

    this.x = value;
  }
}

let fifthpoint = new Fifthpoint(1, 2);
let x = fifthpoint.x //here we get the x value and display it to the user
// fifthpoint.setX(10); cleaner syntax below
fifthpoint.x = 10;
fifthpoint.draw();


///===================================== MODULES =========================//////

//we add the name of the types that we want to import and if we want to add more we seperate the types through commas

import  { Sixthpoint } from './sixthPoint' ;//name of the module is the path

let sixthpoint = new Sixthpoint(1, 2);
sixthpoint.draw();
