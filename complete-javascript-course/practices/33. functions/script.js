'use strict';

function logger() {
    console.log(`My name is Jonas`);
}

// calling / running / invoking function
logger();
logger();
logger(); // we can reuse function over and over

// parameters and arguments
function fruitProcessor(apples, oranges) {
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
    return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);