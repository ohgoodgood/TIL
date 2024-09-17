'use strict';

const friends = ['Michael', 'Steven', 'Peter'];
friends.push('Jay');
console.log(friends);
// push 함수는 length 값을 return함
// const newLength = friends.push('Jay');
// console.log(newLength);

friends.unshift('John');
console.log(friends);
// unshift 함수도 legnth 값을 return함

friends.pop(); // remove the last element
friends.pop();
console.log(friends);
// pop 함수는 제거된 element를 return함
/* const popped = friends.pop();
console.log(popped);
console.log(friends); */

friends.shift(); // remove the first element
console.log(friends);

console.log(friends.indexOf('Steven'));
console.log(friends.indexOf('Bob')); // array에 없는 element를 지정하면 -1이 출력됨

// includes 함수는 특정 요소가 array 안에 있으면 true, 없으면 false 출력.
console.log(friends.includes('Steven'));
console.log(friends.includes('Bob'));
// 이 때 비교는 strict comparison으로 진행됨.
friends.push(23);
console.log(friends.includes('23'));
console.log(friends.includes(23));

// includes 함수 활용 예시
if (friends.includes('Steven')) {
    console.log('You have a friend called Steven');
}