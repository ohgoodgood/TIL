const age = 23;
age >= 18 ? console.log(`I like to drink wine 🍷`) : console.log(`I like to drink water 💧`);
// conditional(ternary) operator is an operator, which produces a value. so it is an expression.

// so, we can use it to conditionally declare variables. very useful!!
const drink = age >= 18 ? `wine` : `water`;
console.log(drink);

// same task with if-else statement
let drink2;
if (age >= 18) {
    drink2 = `wine`;
} else {
    drink2 = 'water';
}
console.log(drink2);

// ternary operator can be used even in a template literal! because it's an expression
console.log(`I like to drink ${age >= 18 ? `wine` : `water`}`);

// but ternary operators cannot fully replace if-else statements.