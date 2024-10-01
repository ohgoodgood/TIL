'use strict';

////////////////// hihger-order functions: functions returning functions //////////////////

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Jonas'); // greet('Hello') 자체가 하나의 function으로 반환됨. 그래서 그걸 호출하면서 argument로 ('Jonas') 전달한 것.

// An arrow function returning another
const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('Hi')('Jonas');

////////////////// hihger-order functions: functions accepting callback functions //////////////////
/*
const oneWord = function (str) {
  return str.replaceAll(' ', '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// another example
const high5 = function () {
  console.log('👋🏻');
};
document.body.addEventListener('click', high5);

// another example
['Jonas', 'Martha', 'Adam'].forEach(high5);

// NOTE: callback function을 왜 사용하는가? 1) 각각의 기능을 분리해 두어서 유지보수 및 재사용에 용이. 2) 'abstraction'을 만들 수 있어서

// NOTE: 'abstraction'이란? 하위 기능이 어떻게 작동하는지는 신경쓰지 않고, 주 기능에만 초점을 두는 것. 즉 callback 함수를 그대로 가져다 씀으로써, 그 callback 함수가 어떻게 동작하는지와 관계 없이 higher-order 함수는 자신의 기능을 위해 callback 함수의 기능을 사용할 수 있다. 불필요한 세부 사항을 숨기고 중요한 부분만을 드러낸다는 개념
*/

////////////////// How Passing Arguments Works: Value vs. Reference //////////////////
/*
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 237123984,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999'; // variable 'flightNum' is a seperate one from variable 'flight' here. so, changing it's value to 'LH999' doesn't change the value of the variable 'flight'.
  passenger.name = 'Mr. ' + passenger.name; // reference in the memory HEAP is copied; here, manipulating object 'passenger' is exactly the same with manipulating object 'jonas'

  if (passenger.passport === 237123984) {
    alert('Checked in');
  } else {
    alert('Wrong passport!');
  }
};

// checkIn(flight, jonas);
// console.log(flight); // LH234
// console.log(jonas); // Mr. Jonas Schmedtmann ...

// 함수에서 객체를 조작할 때 나타나는 문제의 현실적 사례: 둘 이상의 함수가 같은 객체를 조작하는 경우, 둘 다 원본 객체의 값을 바꿔버림. 예상 못한 문제 발생할 수 있음.
const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000);
};
newPassport(jonas);
checkIn(flight, jonas);

////// NOTE: 보통 다른 언어에서는 pass by value와 pass by reference가 둘 다 가능하다. 그런데 자바스크립트에서는 pass by value만 가능하다. 위에서 object를 pass한 것은 reference를 pass한 것처럼 보이지만, 사실은 memory address라는 value를 pass한 것이다.
*/

////////////////// Default Parameters //////////////////
/*
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers // ES6의 새로운 방식에서는, 기본값으로 어떠한 value도 다 넣을 수 있다. 그래서 (이 parameter 이전에 정의된) 다른 parameter를 동적 value로 쓸 수도 있다.
) {
  // ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

createBooking('LH123', undefined, 1000); // 위와 같이 동적 value 정의해 두었을 때, 'numPassengers' argument를 기본값으로 두고 싶으면 그냥 비워 둘 수는 없고 'undefined' 지정해 주어야 함
*/
