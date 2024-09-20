'use strict';

// for (let rep = 1; rep <= 10; rep++) {
//     console.log(`Lifting weights repetition ${rep} 🏋🏻‍♀️`);
// }

// let rep = 1;
// while (rep <= 10) {
//     console.log(`WHILE: Lifting weights repetition ${rep} 🏋🏻‍♀️`);
//     rep++;
// }

// while loop doesn't depend on a counter variable. if need a loop without a counter(when you do not know how many iterations the loop will have), use while loop.
let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
    console.log(`You rolled a ${dice}`);
    dice = Math.trunc(Math.random() * 6) + 1;
    if (dice === 6) console.log(`Loop is about to end...`);
}