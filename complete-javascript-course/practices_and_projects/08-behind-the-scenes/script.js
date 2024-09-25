'use strict';

function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, You are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1991 && birthYear <= 1996) {
      var millenial = true;
      // creating new variable with same name as outer scope's variable
      const firstName = `Steven`; // 같은 firstName 변수가 현재 스코프 안과 밖에 다 있을 때, 안의 것이 적용되고 scope lookup은 더 이상 진행되지 않음. 다른 스코프에 있으면 사실상 다른 변수임. 변수 이름만 같을 뿐

      // reassigning outer scope's variable
      output = `NEW OUTPUT!`; // 부모스코프에서 선언된 변수를 자식스코프에서 재선언 가능

      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
    // console.log(str);
    console.log(millenial); // no error. var variables are function-scoped, not block-scoped
    // add(2, 3); // functions are block-scoped (only in strict mode)
    console.log(output);
  }
  printAge();

  return age;
}

const firstName = 'Jonas';
calcAge(1991);
// console.log(age);
// printAge();
