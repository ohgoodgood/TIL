'use strict';

////////////////// the call, apply and bind methods //////////////////
/*
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function () {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// book(23, 'Sarah Williams');
// this doesn't work! it's not the 'book' method in 'lufthansa' object anymore. it's just another seperate regular function. so, 'this' in this function points 'undefined'.

// Call method //
book.call(eurowings, 23, 'Sarah Williams'); // calling 'call' method which calls 'book' function with 'this' keyword set to 'eurowings'.
// we can manually and explicitly set a 'this' keyword of a function.
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

// Apply method //
// call method와 똑같이 작동하지만, argument를 하나하나 받는게 아니라 array로 받음. 요즘은 잘 안 씀.
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

// 지금은 이렇게 쓰는 게 더 일반적
book.call(swiss, ...flightData);

// Bind method //
// it doesn't call a function. it just returns a new function with 'this' keyword bound by coder.
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23); // 'this': eurowings, 'flighNum': 23,
bookEW23('Jonas Schmedtmann'); // now it only needs 'name' argument
bookEW23('Martha Cooper');

// with eventlistners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);
// event handler is calling the function... here, 'this' points to what the event handler is attached to. (here, button)
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
// event handler is not calling the function. it's just returning a new function with a fixed 'this'.

// partial application (working with preset parameters)
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23); // 'this': null, 'rate': 0.23
// addVat = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));
*/

////////////////// hihger-order functions: functions returning functions //////////////////
/*
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
*/

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

/////////////////////////////////////////// Coding Challenge ///////////////////////////////////////////

// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]
*/

const poll = {
  question: 'What is your favourite programming language?',

  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],

  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),

  registerNewAnswer: function () {
    // get answer
    const answer = prompt(
      `${this.question}\n${this.options.join('\n')}\n(Write option number)`
    );

    // if the user clicks 'cancel' or provides an empty input
    if (answer === null) {
      alert('Poll canceled');
      return; // Exit the function early
    }

    // if the user enters normal answers
    const answerNumber = Number(answer);

    // register answer
    if (!isNaN(answerNumber) && answer >= 0 && answer <= 3) {
      this.answers[answerNumber]++;
    } else {
      alert('Invalid input. Please enter a number between 0 and 3!');
    }

    // display answer
    this.displayResults();
    this.displayResults('string');
  },

  displayResults: function (type = 'array') {
    if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    } else if (type === 'array') {
      console.log(this.answers);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// BONUS
// BONUS TEST DATA 1: [5, 2, 3]
// BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
