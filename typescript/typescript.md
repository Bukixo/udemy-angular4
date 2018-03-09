
> Angle brackets `>` are used for block quotes.  
Technically not every line needs to start with a `>` as long as
there are no empty lines between paragraphs.  
> Looks kinda ugly though.
> > Block quotes can be nested.  
> > > Multiple Levels

Most markdown syntaxes work inside block quotes.
>
> * Lists
> * [Links][arbitrary_id]
> * Etc.



### Declaring Variables

There are two ways of declaring variables **var** or **let**.
When using **var** to declare variables, they become scoped to the nearest function which in this case is available anywhere in the doSomething function.
**const** is an augmentation of let in that it prevents re-assignment to a variable.

~~~ JavaScript
function doSomething() {
  for (var i = 0; i < 5; i++) {
    console.log(i);
  }
  console.log('Finally: ' + i)
}

doSomething();
~~~


Using the **let** keyword means that the variable is scoped to the nearest block instead.
That way we can catch any errors before compile time.
Typescipt compiles code into es5 code which is supported by other browsers, that's why in the js we would see var rather than let

~~~ typescript
function doSomethingElse() {
  for (let i = 0; i < 5; i++) {
    console.log(i);
  }
  console.log('Finally: ' + i)
}

doSomethingElse();

~~~
### Different types 
The Type System checks the validity of the supplied values, before they are stored or manipulated by the program. This ensures that the code behaves as expected.

#### any Types
The any data type is the super type of all types in TypeScript. Using the any type is equivalent to opting out of type checking for a variable.

#### built-in Types
Unlike with js we are unable to change the type of variable on the fly. Therefore if we declared ```let count = 5``` we won't be able to change ```count = 'a'```.
If we don't know the type of the value ahead of time we use  the following type annotations

~~~
let a: number;
let b: boolean;
let c: string;
let d: any;
let e: number[] = [1,2,3,4];
let f: any[] = [1, true, 's',false];
let g: null;
let h: undefined;
~~~
>A variable initialized with undefined means that the variable has no value or object assigned to it while null means that the variable has been set to an object whose value is undefined.

#### User-defined Types
User-defined types include Enumerations (enums), classes, interfaces, arrays, and tuple.

If we are working for on a group of related constances, this is what it would look like in vanilla javascript

```const ColorRed = 0;
const ColorGreen = 1;
const ColorBlue = 2; 
```
> However this declaration is very verbose


Instead we use the concept of **enum** so we can put all the related const in an container. An enum is a way of giving more friendly names to sets of numeric values.

The first const is already assigned 0 and each susbquent const gets an incremented value so we don't have to explicitly set it. However, it is good practice to set it. That also means that we can manually change the value.

~~~
enum Color { Red = 0, Green = 1, Blue = 2};
let backgroundColor = Color.Red;
~~~

### TYPE ASSERTIONS 

When var is defined as a string we are given a range of methods through the intelliSense that can be applied to a string
 
~~~
let message = 'abc'
let upperCase = message.toUpperCase;
~~~
>intelliSense option gave you the '.toUpperCase' method.

But sometimes typescript can be confused with the type of the variable
If we dont set a value, the intelliSense, displaying the methods that are associated with strings, would no longer be in use as we would be working with **any** type.

Therefore we need to tell the typescript compiler that we are working with a string. This is done using type assertion.

~~~
let newMessage
newMessage = 'abc' //by default if we dont set a value it'll automatically be assigned to type any
let anotherUpperCase = (<string>message).toLowerCase; //this approach is used more
let alterntaiveUpperCase = (message as string).toLowerCase;
~~~

Type assertions do not restructure the type of a variable during run time. It only tells typescipt the type of varbale, that way we can access the intelliSense.


### ARROW FUNCTIONCTIONS

>JavaScript way

~~~
let log = function(message) {
  console.log(message);
}
~~~
>Typescript way - no function keyword

~~~
let doLog = (message) => {
  console.log(message);
}
~~~

>Refactored one liner

~~~
let secondDoLog = (message) => console.log(message);
~~~

>If you have no parameters

~~~
let thirdDoLog = () => console.log();
~~~

### Interfaces and Custom Types

When working with more complex functions with several paramenters, it is likely that all these paramaters belong to a single concept. For example a car may have several properties and we wouldn't want to pass each property to a function.

~~~
let drawPoint = (a, b) => {
  //..
}
~~~

Instead we incapsulate them into an object and only pass that one object

~~~
let anotherDrawPoint = (point) => {
  //..
}
~~~

and here we call the function and define the object with the two properties

~~~
anotherDrawPoint({
  x: 1,
  y: 2
})
~~~

If our algorithm is expecting a specific property ie it expects 'c', 'y' but we enter 'Mosh', it doesn't return an error. A solutions to this is by using inline annotations - adding custom types. It works for simple cases but it's still verbose and another function may require the point object therefore we wouldn't want to repeat ourselves

~~~
let yetAnotherDrawPoint = (point: { x: number, y: number }) => {
  //..
}

yetAnotherDrawPoint ({
  x: 1,
  y: 2
})
~~~

In those cases an Interface may be the best solution. We define an Interface and define the shape of the object

~~~
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
~~~

### Classes

Things that are related should be part of one unit. Interfaces are purely used for declarations therefore we cannot move our implemations within the functions.
So instead we add a function declaration i.e draw: () => void

~~~
class NewPoint { //to apply to cohesion rule we changed this to class
  x: number;
  y: number; // these are fields

  draw() {
    console.log('X: '+ this.x + 'Y: '+ this.y);
  }
  getDistance(another: NewPoint) { // this is a method
    //...
  }
}

~~~
> Unlike Interfaces we can add implementations into classes which we refer to as methods and fields
The fields and methods are members of a this specific class.

### Creating objects - instances of the class
Working with objects that use custom types we need to allocate memory to it and this is done by defining a new object

~~~
let newpoint = new NewPoint();
newpoint.x = 1;
newpoint.y = 2;
newpoint.draw();
~~~

### Constructors

Now looking at the object above that we've initalised, we can see that it is quite verbose as we have a few lines to create the object in a valid state.
Constructors help us with the refactoring. It is a method that is called when we create an instance of that class

~~~
class SecondPoint {
  x: number;
  y: number;

  constructor(x: number, y: number){
    this.x = x;
    this.y = y
  }
~~~

If we want to create an object without setting values or if we are unsure of the values, we can't set more than one constructor. So a solution is to make paramteters optional with '?'.
If you make a parameter optional, all the parameters on the right should be optional too

~~~
...
  draw() {
    console.log('X: '+ this.x + 'Y: '+ this.y);
  }
}

let secondpoint = new SecondPoint(1, 2); 
secondpoint.draw();
~~~

when creating new objects we need to supply the values that we have created in the constructors that way we can simplyfy the code and remove the extra lines.


### ACCESS MODIFIERS 

When we initialize an object we shouldn't be able to change the value of it's coordinates. This makes programmes more predictable and more likely to prevent bugs. Using typescript's Access modifiers, which are 'Public', 'Private', and 'Protected' provides a solution to this issue. 'Public' and 'Private' are the most commonly used and by default all members of a class are 'Public'.
So as it's public and we are able to access all the members on the intelliSense.
By prefixing a field or method with the 'Private' keyword we restrict the access of the member

~~~
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
~~~

Overall, Access Modifiers warrants us to control to certain members of a class form the outside.


### Access Modifiers in Constructors parameters
~~~
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
~~~
### Properties 

Properties what are they used for? If you have private fields and you want to have a read only access to the outside a solution to this is using property 'get' - getter.
Or if you want to give the consumer of the classes the ability to set values but with one basic validation.
In that case property 'set' - setter would be used.
Properties can be read as fields therefore we use camel case notation.
To avoid clash with existing fields we use the convention of prefixing underlying fields with an underline.
Properties look like fields form the outside but internally it's really a method within a class.

~~~
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
~~~

### MODULES 

We add the name of the types that we want to import and if we want to add more we seperate the types through commas
~~~
import  { Sixthpoint } from './sixthPoint' ;//name of the module is the path

let sixthpoint = new Sixthpoint(1, 2);
sixthpoint.draw();
~~~