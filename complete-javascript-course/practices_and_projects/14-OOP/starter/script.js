'use strict';

//////////////////// Constructor functions and the new operator ////////////////////
/*
const Person = function (firstName, birthYear) {
  // instance properties
  this.firstName = firstName; // parameter -> property
  this.birthYear = birthYear;

  // NEVER create a method inside a constructor function! we'll use prototypes instead.
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);
// when calling a function with 'new' operator,
// 1. a new empty {} is created
// 2. the function is called, 'this' = {}
// 3. {} is linked to a prototype
// 4. function automatically returns {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

console.log(jonas instanceof Person);
const jay = 'Jay';
console.log(jay instanceof Person);

///////////////////////////////////// Prototypes /////////////////////////////////////

console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();
jack.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype); // setting the '__proto__' property on the object to the 'prototype' property on the constructor function

// Person.prototype 은 Person이라는 constructor function으로 생성된 모든 object들의(그 object들이 접근할 수 있는) prototype. Person 자체의 prototype이 아님에 주의. (Person의 'prototype' property임)
console.log(Person.prototype.isPrototypeOf(Person));
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(matilda));

// prototype에 작성되고 object에 inherit된 property와, object 자체에 작성된 property
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));

//////////////////// Prototypal inheritance on built-in objects /////////////////////

console.log(jonas.__proto__); // Person.prototype
console.log(jonas.__proto__.__proto__); // Object.prototype
console.log(jonas.__proto__.__proto__.__proto__); // null

console.dir(Person.prototype.constructor); // Person

const arr = [3, 6, 4, 6, 5, 9, 3, 9, 6, 6]; // = new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); // true

console.log(arr.__proto__.__proto__); // Object.prototype

// Adding a new function(method) into 'prototype' property of 'Array' constructor, so that every array later can use that method
// But this is not a good idea... (1) the next version of JS may add a new method with the same name, (2) Team-wise, if multiple developers add their own methods with names to the property...
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

// just exploring prototype chains...
const h1 = document.querySelector('h1');
console.dir(h1);
console.dir(x => x + 1);
*/

///////////////////////////////// ES6 classes ///////////////////////////////////////
/*
// class expression
// const PersonCl = class {};

// class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // methods written here(inside the class and outside of the constructor) will be added to the will-be-created objects' prototype!
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // setting a property that already exists... for data validation, for example!
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }
}

// class 안에 method 작성하는 것과 아래처럼 prototype에 직접 추가하는 것은 동일함!
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
jessica.greet();

console.log(jessica.__proto__ === PersonCl.prototype); // true

// NOTES
// 1. classes are not hoisted.
// 2. classes are first-class citizens.
// 3. classes are executed always in strict mode.

//////////////////////////////// Setters and Getters ////////////////////////////////
const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

// with getter and setter, we can use a functionality not in a form of calling a method but in a form of reading a property

console.log(account.latest);

account.latest = 50;
console.log(account.movements);

// also works in a class
console.log(jessica.age);
*/

/////////////////////////////// Static methods ////////////////////////////////////
// methods attached dirctly to a constructor or a class, but not to a prototype
/*
// with a constructor
const Person = function (firstName, birthYear) {
  // instance properties
  this.firstName = firstName; // parameter -> property
  this.birthYear = birthYear;
};

Person.hey = function () {
  console.log(`Hey there`);
  console.log(this);
};
Person.hey();
// jonas.hey();
// the 'hey' method is not inherited! so this doesn't work

// with a class
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  static hey() {
    console.log(`Hey there`);
    console.log(this);
  }
}
PersonCl.hey();
*/

////////////////////////////////// Object.create //////////////////////////////////
/*
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979); // this is completely different from (constructor function + 'new' method) or (es6 class + constructor method) !! this is just a manual way of initializing an object.
sarah.calcAge();
*/

/////////////// Inheritance between "classes": (1)constructor functions /////////////

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// linking prototypes
Student.prototype = Object.create(Person.prototype); // create an empty object 'Student.prototype', which inherits 'Person.prototype'
// shd be done before adding any properties / methods into 'Student.prototype' object!

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer science');
console.log(mike);
mike.introduce();
mike.calcAge(); // this works bc of prototype inheritance (this method is in Person.prototype)

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

console.dir(Student.prototype.constructor); // Person 이라고 잘못 뜸 (Object.create를 사용했기 때문)
Student.prototype.constructor = Student; // 바로잡아주기
console.dir(Student.prototype.constructor); // Student 라고 제대로 뜸

/////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////// Coding Challenge #1 ////////////////////////////////
/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/
/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);
console.log(car1, car2);

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

car1.accelerate();
car2.accelerate();
car1.brake();
car2.brake();
*/

//////////////////////////////// Coding Challenge #2 /////////////////////////////////
/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
/*
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  acclerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
console.log(ford.speedUS);
ford.acclerate();
ford.acclerate();
ford.brake();
ford.speedUS = 50;
console.log(ford);
*/
