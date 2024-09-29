'use strict';

//////////////////// Coding Challenge #1 ////////////////////
/* 
//We're building a football betting app (soccer for my American friends 😅)!
// TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

// DATA //
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// TASK 1: Create one player array for each team (variables 'players1' and 'players2')
// const players1 = [...game.players[0]];
// const players2 = [...game.players[1]];
// console.log(players1, players2);
const [players1, players2] = game.players;
console.log(players1, players2);

// TASK 2: The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players.
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

// TASK 3: Create an array 'allPlayers' containing all players of both teams (22 players)
const allPlayers = [...game.players[0], ...game.players[1]];
console.log(allPlayers);

// TASK 4: During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
const players1Final = [...game.players[1], 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

// TASK 5: Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

// TASK 6: Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
const printGoals = function (...playerNames) {
  console.log(playerNames);
  console.log(playerNames.length);
};
printGoals(...game.scored);

// TASK 7: The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.
team1 < team2 && console.log(`Team1 is more likely to win`);
team1 > team2 && console.log(`Team2 is more likely to win`);
team1 === team2 && console.log(`It's a tie`);
*/

//////////////////// LECTURE ////////////////////

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // orderDelivery: function (obj) {
  //   console.log(obj);
  // },

  // 아래 'restaurant.orderDelivery' 객체를 argument로 받으면서, 바로 destructure까지 하는 방법
  // default value도 지정 가능
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    // console.log(
    //   `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
    // );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}.`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

// 데이터가 지정/전달되지 않은 property에 대해서는 destructure할 때 설정한 기본값이 할당됨
restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});

////////// looping arrays: the for-or loop //////////

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);

// for (const item of menu.entries()) {
//   console.log(`${item[0] + 1}: ${item[1]}`);
// }

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}

// (걍 참고) console.log([...menu.entries()]);

////////// logical assignment operators //////////
/*
const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// OR operator short-circuiting
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// same work using OR assignment operator '||='. assign a value to a variable if it is currently falsy.
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// using nullish assignment operator '??='
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// AND operator short-circuiting
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';

// same work using AND assignment operator '&&='. assign a value to a varialbe if it is currently truthy.
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1);
console.log(rest2);
*/

////////// nullish coalescing operator //////////
/*
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10; // 위에서 0 할당한게 falsy라서 안먹히고 기본값 10이 출력되는 문제 발생
console.log(guests);

// nullish: null and undefined (NOT including 0 or '')
const guestCorrect = restaurant.numGuests ?? 10; // 여기선 문제 해결됨. '??' 때문에. '??'는 nullish value에 대해서 단축평가를 수행한다. 그런데 여기서 0은 nullish value가 아니므로, 0이 출력됨. numGuests가 undefined인 경우에는 10이 출력.
console.log(guestCorrect);
*/

////////// short circuiting //////////
/*
// use any data type, return any data type: short-circuiting (short-circuit evaluation)
// OR operator returns the first truthy value or the last value of all the operands if all are falsy. practically, we can use it to set default values.
// AND operator returns the first falsy value or the last value of all the operands if all are truthy. practically, we can use it to execute the second operand if the first one is true.

console.log(`---- OR ----`);
console.log(3 || 'Jonas'); // 3
console.log('' || 'Jonas'); // Jonas
console.log(true || 0); // true
console.log(undefined || null); // null

console.log(undefined || 0 || '' || 'Hello' || 23 || null); // Hello

// practical example. two codes here do the same work!
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log(`---- AND ----`);
console.log(0 && 'Jonas');
console.log(7 && 'Jonas');

console.log('Hello' && 23 && null && 'jonas');

// practical example. two codes here do the same work
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
*/

////////// rest pattern and parameters //////////
/*
// (usecase 1) destructuring

// [note] rest is the opposite of spread
// [note] spread is used where we otherwise would use multiple values with comma.
// [note] rest pattern is used where we otherwise would use multiple variables with commas. NOT values!

// spread: on the right side of '='
const arr = [1, 2, ...[3, 4]];
// rest: on the left side of `=`
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others); // 1, 2, [3, 4, 5]

const [p, , r, ...otehrFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(p, r, otehrFood);
// NOTE THAT rest element doesn't include skipped variables. it should always be the last element.

// rest working on objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// (usecasse 2) functions (rest parameter)
// 몇 개의 argument가 전달될지 모를 때, 어쨌든 전부 다 parameter에 전달할 수 있음
const add = function (...numbers) {
  console.log(numbers); // 전달된 argument들이 array로 묶인 것을 확인할 수 있음
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');
*/

////////// spread operator //////////
/*
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr); // [1, 2, 7, 8, 9]

// const newArr = [1, 2, arr];
// console.log(newArr); // [1, 2, Array(3)]

const newArr = [1, 2, ...arr];
console.log(newArr); // [1, 2, 7, 8, 9]

console.log(...newArr); // 1 2 7 8 9
console.log(1, 2, 7, 8, 9); // 1 2 7 8 9

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// [note] a spread operator takes all the elements from an array, and it doesn't create a variable. so we can only use it where otherwise we would have typed multiple values with commas, such as building an array or passing values into a function. //

// copy array with a spread operator
const mainMenuCopy = [...restaurant.mainMenu];

// merge arrays with a spread operator
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// [note] Iterables: arrays, strings, mas, sts, but NOT objects.
// spread operators work on iterables.

// ex) spread operator working on strings
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);
// console.log(`${...str} Schmedtmann`); // it doesn't work

// ex) spread operator with a fucntion
// const ingredients = [
//   prompt(`Let's make pasta! Ingredient 1?`),
//   prompt(`Let's make pasta! Ingredient 2?`),
//   prompt(`Let's make pasta! Ingredient 3?`),
// ];
// console.log(ingredients);

// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
// restaurant.orderPasta(...ingredients);

// [note] since ES2018, spread operator works on objects as well.
// ex)
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

// copying object with spread operator
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);
*/

////////// destructuring objects //////////
/*
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// destructing and assigning new variable names
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// setting default values. it's useful when using data from outside (which we don't know exactly how it looks)
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// destructing objects and mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj); // 원래는 증괄호 영역이 code block으로 인식되기에, value asisgn할 수 없다. 그래서 괄호로 전체를 한 번 더 묶어준 것.
console.log(a, b);

// desturcting nested object + changing variable names
const {
  fri: { open: o, close: c },
} = restaurant.openingHours;
console.log(o, c);
*/

////////// destructuring arrays //////////
/*
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z); // 2 3 4
console.log(arr);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary); // Italian Vegeterian

// how we switch variables' values
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

// more easily with destructuring and reassigning
[main, secondary] = [secondary, main];
console.log(main, secondary); // Vegeterian Italian

console.log(restaurant.order(2, 0)); // ['Garlic Bread', 'Pizza']

// receive 2 return values from a function and create 2 variables
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse); // Garlic Bread Pizza

// nested destructuring
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j); // 2, [5, 6]
const [i, , [j, k]] = nested;
console.log(i, j, k); // 2, 5, 6

// setting default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r); // 8, 9, 1
*/
