'use strict';

////////////////// How Passing Arguments Works: Value vs. Reference //////////////////

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
