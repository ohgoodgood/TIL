// Up to chapter 10 //
/*
let js = 'amazing';
console.log(40 + 8 + 23 - 10);

console.log('Jonas');
console.log(23);

let firstName = "Matilda"; // 여기서 값을 바꿔주면 같은 변수가 사용된 모든 곳에 적용되어 편리하다

console.log(firstName);
console.log(firstName);
console.log(firstName);

// Variable name conventions
let jonas_matilda = "JM";
let $function = 27;

let person = "jonas";
let PI = 3.1415;

let myFirstJob = 'Programmer';
let myCurrentJob = 'Teacher';

console.log(myFirstJob);
*/

// Chapter 11 //
/*
let javascriptIsFun = true;
console.log(javascriptIsFun);

// console.log(typeof true);
console.log(typeof javascriptIsFun);
// console.log(typeof 23);
// console.log(typeof 'Jonas');

javascriptIsFun = 'YES!';
console.log(typeof javascriptIsFun);

let year;
console.log(year);
console.log(typeof year);


year = 1991;
console.log(typeof year);
*/

// Chapter 12 //
/*
let age = 30;
age = 31; // 'reassigning a value to a variable' or 'mutating a variable'

const birthYear = 1991;
// birthYear = 1990; --> error

// const job; --> error

var job = 'programmer';
job = 'teacher';

/* This is a poor idea
lastName = 'Kim';
console.log(lastName);
*/

// Chapter 13 //
/*
// Math operators
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;
console.log(ageJonas, ageSarah);

console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);
// 2 ** 3 means 2 to the power of 3 = 2 * 2 * 2

const firstName = 'Jonas';
const lastName = 'Schmedtmann';
console.log(firstName + ' ' + lastName);

// Assignment operators
let x = 10 + 5; // x = 15
x += 10; // x = x + 10
x *= 4; // x = x * 4
x++; // x = x + 1
x--; // x = x - 1
console.log(x);

// Comparison operators
console.log(ageJonas > ageSarah); // >, <, >=, <=
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;

console.log(now - 1991 > now - 2018);
*/

// Chapter 14 //
/*
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

// Operator precedence

console.log(now - 1991 > now - 2018);

let x, y;
x = y = 25 - 10 - 5; // x = y = 10
console.log(x, y);

const averageAge = (ageJonas + ageSarah) / 2
console.log(ageJonas, ageSarah, averageAge);
*/

// Chapter 17. Strings and Template Literals //
/*
const firstName = "Juseok";
const job = 'programmer';
const birthYear = 1995;
const year = 2024;

const juseok = "I'm " + firstName + ", a " + (year - birthYear) + " years old " + job + "!";
console.log(juseok);

const juseokNew = `I'm ${firstName}, a ${year - birthYear} years old ${job}!`;
console.log(juseokNew);

console.log(`Just a regular string...`);

console.log('String with \n\
multiple \n\
lines');

console.log(`String with
multiple
lines`);
*/

// Chapter 18. Taking Decisions: if / else Statements //
/*
const age = 15;

// If-else Control Structure
if (age >= 18) {
    console.log('Sarah can start driving license');
} else {
    const yearsLeft = 18 - age;
    console.log(`Sarah is too young. Wait another ${yearsLeft} years :)`);
}

const birthYear = 2012;

let century;
if (birthYear <= 2000) {
    century = 20;
} else {
    century = 21;
}
console.log(century);
*/

// Chapter 20. Type Conversion and Coercion
/*
// type conversion (deliberately converting data type)
const inputYear = '1991';
console.log(Number(inputYear), inputYear); // return a converted(string->number) value
// NOTE! the original value '1991' is still a string data. It's not changed.
console.log(Number(inputYear) + 18);

console.log(Number('Jonas')); // NaN (Not a Number) 출력됨
console.log(typeof NaN); // 'Number' returned. NaN is an 'invalid number'. Though somewhat weird, it's still considered a number by JS.

console.log(String(23), 23); // return a converted(number->string) value

// type coercion (automatic)
console.log('I am ' + 23 + ' years old'); // '23' is coerced to a string
console.log('I am ' + String(23) + ' years old'); // '23' is converted to a string
console.log('23' - '10' - 3); // string -> number coercion
console.log('23' + '10' + 3); // number -> string coercion
console.log('23' * '2'); // string -> number
console.log('23' / '2'); // string -> number

let n = '1' + 1; // '11'
n = n - 1; // 11 - 1 = 10
console.log(n);

console.log(2 + 3 + 4 + '5'); // "95"

console.log('10' - '4' - '3' - 2 + '5'); // "15"
*/

// Chapter 21. Turthy and Falsy Values
/*

// 5 falsy values: 0, '', undefined, null, NaN

console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean(''));
console.log(Boolean('Jonas'));
console.log(Boolean({}));

const money = 0;
if (money) { // money is coerced into a boolean. 0 (falsy) -> boolean : false
    console.log("Don't spend it all");
} else {
    console.log("You should get a job!");
}

let height;
if (height) { // height is undefined (falsy) -> boolean : false
    console.log('YAY! Height is defined');
} else {
    console.log('Height is undefined');
}
*/

// Chapter 22. Equality Operators
/*
const age = '18';
if (age === 18) console.log('You just became an adult :D (strict)'); // strict equality operator is strongly recommended!

if (age == 18) console.log('You just became an adult :D (loose)'); // just assume it doesn't exist ;)


const favourite = prompt("What's your favourite number?");
console.log(favourite);
console.log(typeof favourite);

if (favourite == 23) { // '23' == 23
    console.log('Cool! 23 is an amazing number!');
}

if (favourite === 23) { // '23' /=== 23
    console.log('woolawoola');
}


const favourite = Number(prompt("What's your favourite number?"));
console.log(favourite);
console.log(typeof favourite);

if (favourite === 23) { // 23 === 23
    console.log('Cool! 23 is an amazing number!');
} else if (favourite === 7) {
    console.log('7 is also a cool number');
} else if (favourite === 9) {
    console.log('9 is also a cool number');
} else {
    console.log('Number is not 23 nor 7 nor 9');
}

if (favourite !== 23) {
    console.log('Why not 23?');
}
*/

