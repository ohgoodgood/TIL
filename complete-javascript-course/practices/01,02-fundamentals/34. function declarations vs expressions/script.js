'use strict';

// function declaration
function calcAge1(birthYear) {
    return 2037 - birthYear;
}

const age1 = calcAge1(1991);
console.log(age1);

// function expression (with anonymous function)
const calcAge2 = function (birthYear) {
    return 2037 - birthYear;
}
// a function produces a value; it's an expression. so we can assign it to a variable.

const age2 = calcAge2(1991);
console.log(age1, age2);

// declaration은 define 하기 전에 call할 수 있지만 expression은 그럴 수 없다.
// 둘 중 무엇을 주로 쓸지는 개인의 선호. 하지만 둘 다 알아야 함.