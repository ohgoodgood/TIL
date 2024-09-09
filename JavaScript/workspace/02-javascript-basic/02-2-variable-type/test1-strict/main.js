'use strict';

let data1 = 10
data2 = 20 // 에러 발생!

console.log(data1, data2)

function myFun() {
    let data3 = 10
    data4 = 20 // 에러 발생!
    console.log(data3, data4)
}
myFun()