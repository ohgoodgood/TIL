'use strict';

const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    birthYear: 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven'],
    hasDriversLicense: false,

    // calcAge: function (birthYear) {
    //     return 2037 - birthYear;
    // }

    // calcAge: function () {
    //     console.log(this);
    //     return 2037 - this.birthYear;
    // }

    calcAge: function () {
        this.age = 2037 - this.birthYear;
        return this.age;
    },

    getSummary: function () {
        return `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he has ${this.hasDriversLicense ? `a` : `no`} driver's license.`
    }
};
// Any function that is attached(included) within an object is called 'method'.
// method: a property with a fucntion value

// console.log(jonas['calcAge'](1991));
console.log(jonas.calcAge()); // here, an object 'jonas' is calling a function 'calcaAge'. so in the function 'calcAge', 'this' variable becomes the object 'jonas'.

console.log(jonas.age);
console.log(jonas.age);
console.log(jonas.age);

// Challenge
// Write "Jonas is a 46-year old teacher, and he has a(or no) driver's license." w/o hard-coding.

/* my answer
if (jonas.hasDriversLicense) {
    console.log(`${jonas.firstName} is a ${jonas.age}-year old ${jonas.job}, and he has a driver's license.`)
} else {
    console.log(`${jonas.firstName} is a ${jonas.age}-year old ${jonas.job}, and he has no driver's license.`)
}
*/

// provided answer
console.log(jonas.getSummary());