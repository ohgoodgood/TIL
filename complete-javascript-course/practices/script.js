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