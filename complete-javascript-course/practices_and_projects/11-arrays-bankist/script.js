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

const displayMovement = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  // .textContent = 0 와 같은 역할

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements; // for sorting

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
      `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
    // 'beforeend'로 하면 밑으로 쌓여서, 맨 위가 1번 맨 아래가 마지막이 됨. 'afterbegin'으로 하면 최근에 추가된 게 맨 위에 옴
  });
};

// compute balance with the reduce method
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => (acc += mov), 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// compute username with the map method and for-each method
const createUsernames = function (accs) {
  // in this case, side effect is to change(mutate) the original array.
  // bc we want the side effect this time, we'll use the foreach method.
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase() // returns string
      .split(' ') // returns array
      .map(name => name[0]) // map method on array // don't need to write 'return' after the arrow! it IS returning
      .join(''); // join method on array
  });

  // const username = user
  //   .toLowerCase() // returns string
  //   .split(' ') // returns array
  //   .map(name => name[0]) // map method on array // don't need to write 'return' after the arrow! it IS returning
  //   .join(''); // join method on array
  // return username;
};
createUsernames(accounts);

const updateUI = function (acc) {
  // display movements
  displayMovement(acc.movements);

  // display balance
  calcDisplayBalance(acc);

  // display summary
  calcDisplaySummary(acc);
};

//// Event Handlers ////
let currentAccount;

// Login feature
btnLogin.addEventListener('click', function (e) {
  // prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  ); // find method in action !!
  console.log(currentAccount);

  // optional chaining in action !
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display UI and a welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

// Transfer feature
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    receiverAcc.username !== currentAccount.username &&
    currentAccount.balance >= amount
  ) {
    // doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // update the UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // add movement
    currentAccount.movements.push(amount);

    // update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

// Closing an account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // findindex method returns the index of the first element which meets the condition. similar to 'indexof' method, but in indexof method we can only pass a value, not a complex condition //

    // delete account
    accounts.splice(index, 1);

    // hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

// Sorting feature
let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovement(currentAccount.movements, !sorted);
  sorted = !sorted;
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

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
/*
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
*/

///////////////// foreach with maps and sets ////////////////////
/*
// with a map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// with a set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${_}: ${value}`); // set has no keys nor indexes. so arguments: value, value, map
});
*/

//////////////////// the map method ////////////////////
/*
const euroToUsd = 1.1;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// with map method - more close to the paradigm of functional programming

// const movementsUSD = movements.map(function (mov) {
//   return mov * euroToUsd;
// });
// console.log(movements);
// console.log(movementsUSD);


// refactoring the callback fucntion to an arrow function (but depends on preference)
const movementsUSD = movements.map(mov => mov * euroToUsd);
console.log(movements);
console.log(movementsUSD);

// same task with for-of looping
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * euroToUsd);
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    // if (mov > 0) {
    //   return `Movement ${i + 1}: You deposited ${mov}`;
    // } else {
    //   return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
    // }

    // refactoring
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);
// NOTE: with for-each method, 'side effects' occur for every iteration. BUT there's no side effect from map method.
*/

////////////////////// the filter method ////////////////////////
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// using filter method. more 'functional' approach and compatible with chaining.
const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

// using for-of looping. chaining is not available.
const depositsFor = [];
for (const mov of movements)
  if (mov > 0) {
    depositsFor.push(mov);
  }
console.log(depositsFor);
*/

///////////////////////// the reduce method ///////////////////////////
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// accumulator: like a snowball
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0); // initial value of the accumulator
// console.log(balance);

const balance = movements.reduce((acc, cur, i, arr) => acc + cur, 0); // initial value of the accumulator
console.log(balance);

// using for loop
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]); // here, initial value of accumulator = first value of the array
console.log(max);
*/

////////////////////////////////// chaining methods //////////////////////////////////////
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroToUsd = 1.1;

// chaining... works like a pipeline
const totalDeopsitsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euroToUsd)
  // 단계별로 결과물을 확인하고자 할 때 (디버깅 등의 경우), arr로 접근 가능
  // .map((mov, i, arr) => {
  //   console.log(arr);
  //   return mov * euroToUsd;
  // })
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDeopsitsUSD);
*/

////////////////////////////////// the find method //////////////////////////////////////
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal); // find method only returns the first element which meets the condition, not in an array but just the value.
// NOTE: filter method returns all elements that meets the condition, in a form of new array.

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
*/

////////////////////////////////// the some and every method //////////////////////////////////////
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);

// include method: only test equality
console.log(movements.includes(-130)); // true

// some method: can test condition as well
console.log(movements.some(mov => mov === -130)); // true
const anyDeposits = movements.some(mov => mov > 5000);
console.log(anyDeposits); // false

// every method: test if every element meets the condition
console.log(movements.every(mov => mov > 0)); // false
console.log(account4.movements.every(mov => mov > 0)); // true

// seperate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
*/

////////////////////////////////// flat and flatMap method //////////////////////////////////////
/*
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); // [1, 2, 3, 4, 5, 6, 7, 8]

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat()); // [[1, 2], 3, 4, [5, 6], 7, 8] // 1이 생략된 것. 한 층만 벗겨짐
console.log(arrDeep.flat(2)); // 두 층 벗겨짐

// usecase for our app //

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

// with chaining
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// using flatMap
const overallBalance2 = accounts
  .flatMap(acc => acc.movements) // (note) only goes for 1 level deep
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2);
*/

////////////////////////////////// sorting arrays //////////////////////////////////////
/*
// with strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); // A-Z
console.log(owners); // original array mutated

// with numbers
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);
// console.log(movements.sort()); // weird result... b/c sorting based on string

// sorting in ascending order
// movements.sort((a, b) => {
//   if (a > b) return 1; // return > 0 => b, a (switch order)
//   if (a < b) return -1; // return < 0 => a, b
// });
movements.sort((a, b) => a - b); // refactoring
console.log(movements); // sorted in ascending order

// sorting in descending order
// movements.sort((a, b) => {
//   if (a > b) return -1; // return > 0 => a, b
//   if (a < b) return 1; // return < 0 => b, a (switch order)
// });
movements.sort((a, b) => b - a); // refactoring
console.log(movements); // sorted in descending order
*/

///////////////////////////// more ways of creating and filling arrays  /////////////////////////////////
/*
// fill method
const x = new Array(7);
console.log(x); // an array with 7 empty elements

// x.fill(1);
// console.log(x); // fill the entire with 1 (original array mutated)

x.fill(1, 3, 5);
console.log(x); // fill with 1, starting from 3rd and ending before 5th

const arr = [1, 2, 3, 4, 5, 6, 7];
arr.fill(23, 2, 6);
console.log(arr); // doesn't have to be an empty array

// array.from (a method on the function 'Array', not on an array)
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);
});

const movementsUI2 = [...document.querySelectorAll('.movements__value')];
*/

///////////////////////////// array methods practice  /////////////////////////////////
/*
// 1.
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum);

// 2.
// 1st way
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;
// console.log(numDeposits1000);

// 2nd way (with reduce method)
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
console.log(numDeposits1000);

// prefixed ++ operator
let a = 10;
console.log(a++);
console.log(a);
console.log(++a);

// 3.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase(`this is a nice title`));
console.log(convertTitleCase(`this is a LONG title but not too long`));
console.log(convertTitleCase(`and here is another title with an EXAMPLE`));
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////// coding challenge #1 //////////////////////////////////////////
/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
let dogsJulia = [3, 5, 2, 12, 7];
let dogsKate = [4, 1, 15, 8, 3];

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice(1, -2);
  console.log(dogsJuliaCorrected);

  const dogsConcat = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogsConcat);

  dogsConcat.forEach(function (age, i, arr) {
    age >= 3
      ? console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`)
      : console.log(`Dog number ${i + 1} is still a puppy 🐶`);
  });
};
checkDogs(dogsJulia, dogsKate);

console.log(`---------- TEST 2 ----------`);

dogsJulia = [9, 16, 6, 8, 3];
dogsKate = [10, 5, 6, 1, 4];

checkDogs(dogsJulia, dogsKate);
*/

/////////////////////////////////////// coding challenge #2 ///////////////////////////////////////
/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const dogAges = [5, 2, 4, 1, 15, 8, 3];
const dogAges2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? age * 2 : 16 + age * 4));
  console.log(humanAges);

  const adults = humanAges.filter(function (age, i, arr) {
    return age >= 18;
  });
  console.log(adults);

  // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
  const total = adults.reduce(function (acc, cur, i, arr) {
    return (acc = acc + cur);
  }, 0);
  console.log(total);

  const average = total / adults.length;
  console.log(average);
};
calcAverageHumanAge(dogAges);
calcAverageHumanAge(dogAges2);
*/

///////////////////////////////////// coding challenge #3 //////////////////////////////////////////
/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/*
const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);
*/

///////////////////////////////////// coding challenge #4 ////////////////////////////////////////
/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)

dogs.forEach(function (dog, i, arr) {
  const recFood = Math.trunc(dog.weight ** 0.75 * 28);
  dog.recFood = recFood;
});
console.log(dogs);

// dogs.forEach(dog => (dog.recFood = dog.weight ** 0.75 * 28));
// console.log(dogs);

// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  dogSarah.curFood > dogSarah.recFood
    ? `Sarah's dog is eating too much`
    : `Sarah's dog is eating too little`
);

// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dog eat too little!`);

// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)

console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)

console.log(
  dogs.some(
    dog => dog.curFood >= 0.9 * dog.recFood && dog.curFood <= 1.1 * dog.recFood
  )
);

// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)

const dogOK = dogs.filter(
  dog => dog.curFood >= 0.9 * dog.recFood && dog.curFood <= 1.1 * dog.recFood
);
console.log(dogOK);

// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
