'use strict';

// first, select elements and store them into variables
const modal = document.querySelector(`.modal`);
const overlay = document.querySelector(`.overlay`);
const btnsCloseModal = document.querySelector(`.close-modal`);
/* 이렇게 하면 같은 클래스의 요소 여러개 중에 첫번째 것만 선택됨
const btnsOpenModal = document.querySelector(`.show-modal`);
*/
// 이렇게 하면 다 선택됨 (NodeList 생성. array처럼 작동함.)
const btnsOpenModal = document.querySelectorAll(`.show-modal`);
console.log(btnsOpenModal);

for (let i = 0; i < btnsOpenModal.length; i++) {
  console.log(btnsOpenModal[i].textContent);
}
