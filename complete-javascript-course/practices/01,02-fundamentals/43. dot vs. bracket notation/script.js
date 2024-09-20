'use strict';

// an object is another type of data structure in JS.

// object literal syntax
const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    age: 2037 - 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven']
};
console.log(jonas);
// firstName, lastName, age, job, friends: properties
// 'Jonas', 'Schmedtmann' ... : property values

// retrieve property using dot notation
console.log(jonas.lastName); // we have to use the real, final property name here

// retreive property using bracket notation
console.log(jonas['lastName']); // we can put any expression in the bracket. unlike when using dot notation.

const nameKey = 'Name';
console.log(jonas['first' + nameKey]);
console.log(jonas['last' + nameKey]);

// so, when we need to first compute the property name, we shd use bracket notation. otherwise, dot notation is available and easier.
// dot and bracket are operators.

/*
const interestedIn = prompt('What do you want to know about Jonas? Choose between firstName, lastName, age, job, and friends');
console.log(interestedIn);
console.log(jonas.interestedIn); // undefined. object 'jonas' doesn't have any property called interestedIn.
console.log(jonas[interestedIn]); // this works!
if (jonas[interestedIn]) {
    console.log(jonas[interestedIn]);
} else {
    console.log('Wrong request! Choose between firstName, lastName, age, job, and friends');
}
*/

jonas.location = 'Portugal';
jonas['twitter'] = '@jonasschmedtman';
console.log(jonas);

// Challenge
// Write "Jonas has 3 friends, and his best friend is called Micahel" without hard-coding!
console.log(`${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}.`);