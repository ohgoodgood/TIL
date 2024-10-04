'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//////////////////// simple array methods ////////////////////
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

// slice: doesn't change(mutate) the original array
console.log(arr.slice(2)); // ['c', 'd', 'e']
console.log(arr.slice(2, 4)); // ['c', 'd']
console.log(arr.slice(-2)); // ['d', 'e']
console.log(arr.slice(-1)); // ['e']
console.log(arr.slice(1, -2)); // ['b', 'c']
console.log(arr.slice());
console.log([...arr]);

// splice: does change(mutate) the original array (the extracted are gone)
// console.log(arr.splice(2)); // ['c', 'd', 'e']
// console.log(arr); // ['a', 'b']
arr.splice(-1);
console.log(arr); // ['a', 'b', 'c', 'd']
arr.splice(1, 2);
console.log(arr); // ['a', 'd']

// reverse: does mutate the original array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2); // original array mutated

// concat
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// join
console.log(letters.join(' - '));
*/

//////////////////// the new at method ////////////////////
/*
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// getting the last element from an array
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

// also works on strings
console.log('jonas'.at(0));
console.log('jonas'.at(-1));
*/

//////////////////// looping arrays: foreach ////////////////////

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for of 에서 element에 더하여 index에 접근했던 방법
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log(`-------- FOREACH --------`);

// foreach는 current element뿐만 아니라 index, array도 arugument로 전달한다. (순서 주의!)
// 또 하나의 차이: foreach에는 break, continue가 먹히지 않음. 걍 끝까지 다 반복함.
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i}: You withdrew ${Math.abs(mov)}`);
  }
});
// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...
