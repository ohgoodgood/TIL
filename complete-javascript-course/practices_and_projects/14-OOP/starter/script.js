'use strict';

//////////////////// Constructor functions and the new operator ////////////////////

const Person = function (firstName, birthYear) {
  // instance properties
  this.firstName = firstName; // parameter -> property
  this.birthYear = birthYear;

  // NEVER create a method inside a constructor function!
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
