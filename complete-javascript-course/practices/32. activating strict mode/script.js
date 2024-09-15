'use strict'; // it helps us avoid accidental errors

let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriverLicense = true; // 일부러 오타 냄
if (hasDriversLicense) console.log(`I can drive :D`); // 이 때 콘솔에 에러 메시지는 엄격모드 켜져 있을 때만 나타남

// 엄격모드는 조만간 예약어가 될 단어도 쓰지 말라고 걸러준다
const interface = 'Audio';
const private = 534;