'ust strict';

let data = 10
console.log(data, 'type is', typeof data); // "10 'type is' 'number'" 출력

data = '홍길동';
console.log(data, 'type is', typeof data); // "홍길동 type is string" 출력

data = true
console.log(data, 'type is', typeof data); // "true 'type is' 'boolean'" 출력

data = 10.0
console.log(data, 'type is', typeof data); // "10.0 'type is' 'number'" 출력

data = '10'
console.log(data, 'type is', typeof data); // "10 type is string" 출력

let data1 = 10
let data2 = 20
let data3 = '10'
let data4 = '20'

console.log(data1 + data2); // 30 출력
console.log(data3 + data4); // 1020 출력
console.log(data1 + data3); // 1010 출력
