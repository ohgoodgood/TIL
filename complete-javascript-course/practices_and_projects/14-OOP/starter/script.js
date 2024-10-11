'use strict';

//////////////////// Constructor functions and the new operator ////////////////////

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
