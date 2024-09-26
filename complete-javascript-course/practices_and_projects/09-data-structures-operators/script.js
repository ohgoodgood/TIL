'use strict';

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
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
    );
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

//// destructuring objects ////
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
} = openingHours;
console.log(o, c);

//// destructuring arrays ////
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
