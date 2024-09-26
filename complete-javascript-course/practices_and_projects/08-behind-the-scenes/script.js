'use strict';

//// scoping practice ////
/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, You are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1991 && birthYear <= 1996) {
      var millenial = true;
      // creating new variable with same name as outer scope's variable
      const firstName = `Steven`; // 같은 firstName 변수가 현재 스코프 안과 밖에 다 있을 때, 안의 것이 적용되고 scope lookup은 더 이상 진행되지 않음. 다른 스코프에 있으면 사실상 다른 변수임. 변수 이름만 같을 뿐

      // reassigning outer scope's variable
      output = `NEW OUTPUT!`; // 부모스코프에서 선언된 변수를 자식스코프에서 재선언 가능

      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
    // console.log(str);
    console.log(millenial); // no error. var variables are function-scoped, not block-scoped
    // add(2, 3); // functions are block-scoped (only in strict mode)
    console.log(output);
  }
  printAge();

  return age;
}

const firstName = 'Jonas';
calcAge(1991);
// console.log(age);
// printAge();
*/

//// hoisting ////
/*
// variables
// console.log(me); // undefined
// console.log(job); // Cannot access '~' before initialization
// console.log(year); // Cannot access '~' before initialization

var me = 'Jonas';
let job = 'teacher';
const year = 1991;

// functions
console.log(addDecl(2, 3));
// console.log(addExpr(2, 3)); // Cannot access '~' before initialization
// console.log(addArrow(2, 3)); // addArrow is not a function: b/c addArrow is still undefined here, b/c it's declared with 'var'. undefined(2, 3) is not a function.

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

// example
if (!numProducts) deleteShoppingCart(); // numProducts is 'undefined' here, which is a falshy value.

var numProducts = 10;

function deleteShoppingCart() {
  console.log(`All products deleted!`);
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x); // true: 'var' creates a property on the global window object
console.log(y === window.y); // false
console.log(z === window.z); // false
*/

//// 'this' keyword practice ////
/*
console.log(this); // window object

const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); // undefined
};
calcAge(1991);

const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this); // window object. arrow function doesn't have its own 'this' keyword. so 'lexical this'(in this case the global 'this') is used.
};
calcAgeArrow(1980);

const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};
jonas.calcAge(); // jonas is calling (is the owner of) the method here. so 'this' is jonas here.

const matilda = {
  year: 2017,
};

matilda.calcAge = jonas.calcAge; // method borrowing
matilda.calcAge(); // method 'calcAge' is written in the jonas object, but here 'this' is pointing to matilda cause matilda is calling the method here.

const f = jonas.calcAge; // coping a function into a variable
f(); // 'this' is undefined here. 'f' is not attached to any object. no owner for the 'f' function.
*/

//// regular and arrow functions with 'this' keyword ////
/*
const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);

    // solution 1
    // const self = this; // this가 undefined 되는 것을 방지하는 방법. self 또는 that 사용
    // const isMillenial = function () {
    //   //   console.log(this); // undefined
    //   //   console.log(this.year >= 1981 && this.year <= 1996);
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };

    // solution 2
    const isMillenial = () => {
      // use arrow function which inherits parent's scope. 'this' becomes 'jonas' object this time.
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },

  greet: () => console.log(`Hey ${this.firstName}`), // arrow function doesn't have own 'this' keyword -> uses parent's(global in this case) 'this' keyword(window object in this case)
}; // this is not a code block. it's an object literal. so, contents are still under global scope.
jonas.greet();
console.log(this.firstName);
// NEVER USE an arrow function as a method! //

jonas.calcAge();

// arguments keyword
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 8, 12);

var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};
addArrow(2, 5, 8); // arguments keywords also only exist in regular functions, not in arrow functions.
*/

//// primitive and reference values ////

let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);

let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName);
console.log(oldLastName);
// primitive values -> work as expected

const me = {
  name: 'Jonas',
  age: 30,
};
const friend = me;
friend.age = 27;
console.log('Friend:', friend);
console.log('Me', me);

const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before marriage:', jessica);
console.log('After marriage:', marriedJessica);
// objects (reference values) -> works weird

// copying objects - creating another same object and pointing at it
// only works at the first level (shallow copy).
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'], // nested object. Object.assign doesnt work with it
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';
console.log('Before marriage:', jessica2);
console.log('After marriage:', jessicaCopy);

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');
