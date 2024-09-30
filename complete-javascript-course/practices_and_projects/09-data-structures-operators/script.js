'use strict';

//////////////////// Coding Challenge #2 ////////////////////
/*
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

// TASK 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
for (const [goalNumber, playerName] of game.scored.entries()) {
  console.log(`Goal ${goalNumber + 1}: ${playerName}`);
}

// TASK 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
const odds = Object.values(game.odds);
let oddsTotal = 0;
for (const odd of odds) {
  oddsTotal += odd;
}
let oddsAverage = oddsTotal / odds.length;
console.log(oddsAverage);


// TASK 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
//   Odd of victory Bayern Munich: 1.33
//   Odd of draw: 3.25
//   Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

const oddsEntries = Object.entries(game.odds);
console.log(oddsEntries);
for (const [team, odd] of oddsEntries) {
  const teamStr = team === `x` ? `draw` : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr}: ${odd}`);
}


// BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
//       {
//         Gnarby: 1,
//         Hummels: 1,
//         Lewandowski: 2
//       }

const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);
*/

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

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhanced object literals
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // orderDelivery: function (obj) {
  //   console.log(obj);
  // },

  // 아래 'restaurant.orderDelivery' 객체를 argument로 받으면서, 바로 destructure까지 하는 방법
  // default value도 지정 가능
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    // console.log(
    //   `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
    // );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}.`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
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

////////// Maps: Iteration //////////
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct'],
  [false, 'Try again'],
]);
console.log(question);

// convert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}
const answer = Number(prompt('Your answer'));
console.log(answer);

// boolean도 (또는 어떤 타입의 데이터도) key로 삼을 수 있어서 가능한 코드!
console.log(question.get(question.get('correct') === answer));

// convert map to array
console.log([...question]);
// console.log(question.entries());
console.log([...question.keys()]);
console.log([...question.values()]);

////////// Maps: Fundamentals //////////
/*
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));

// calling set method returns updated map, so we can call set again on that map (chaining)
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed');

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));
rest.delete(2);
console.log(rest);
console.log(rest.size);
// rest.clear();

// rest.set([1, 2], 'Test');
// console.log(rest);
// console.log(rest.get([1, 2])); // 위의 [1, 2]와 여기의 [1, 2]는 HEAP 상에서 각각 다른 객체다. 그래서 이 코드는 undefined 나옴

const arr = [1, 2];
rest.set(arr, 'Test');
console.log(rest);
console.log(rest.get(arr));
// now it works

rest.set(document.querySelector('h1'), 'Heading');
*/

////////// Sets //////////
/*
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet);

console.log(new Set('Jonas'));

console.log(ordersSet.size);
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');
// ordersSet.clear();
console.log(ordersSet);

for (const order of ordersSet) {
  console.log(order);
}

// Usecase: remove duplicates from arrays
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
);

console.log(new Set('jonasschmedtmann').size);
*/

////////// looping objects: object keys, values, entries //////////
/*
// Property NAMES
const properties = Object.keys(openingHours);
console.log(properties);
// console.log(`We are open on ${properties.length} days`);
let openStr = `We are open on ${properties.length} days: `;

for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

// Property VALUES
const values = Object.values(openingHours);
console.log(values);

// Looping entire object
const entries = Object.entries(openingHours);

// Using destructuring
for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}
*/

////////// optional chaining //////////
/*
// W/O optional chaning
if (restaurant.openingHours && restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open);
}

// WITH optional chaning
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);
// if sth doesn't exist, 'undefiend' is returned immediately.

// example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// NOTE: optional chaining and nullish coalescing operator both depends on the concept of 'nullish'. and they work very well together.

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// optional chaining on methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// optional chaining on arrays
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];

console.log(users[0]?.name ?? `User array empty`);
*/

////////// enhanced object literals //////////

////////// looping arrays: the for-of loop //////////
/*
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);

// for (const item of menu.entries()) {
//   console.log(`${item[0] + 1}: ${item[1]}`);
// }

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}

// (일단은 참고) console.log([...menu.entries()]);
*/

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
