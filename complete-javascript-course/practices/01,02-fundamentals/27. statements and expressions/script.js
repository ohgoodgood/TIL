// Expressions: produce values by themselves
3 + 4
1991
true && false && !false

// Statements: sentences stating sth. do not produce values by themselves
if (23 > 10) {
    const str = '23 is bigger';
}

console.log(`I'm ${2024 - 1995} years old.`)

/* This doesn't work because there's a statement within ${}. Only expressions can be there.

console.log(`I'm ${if (23 > 10) {
    const str = '23 is bigger';
}}`)

*/