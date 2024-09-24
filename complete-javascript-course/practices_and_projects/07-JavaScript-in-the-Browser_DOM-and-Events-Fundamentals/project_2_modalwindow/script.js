'use strict';

///// first, select elements and store them into variables /////
const modal = document.querySelector(`.modal`);
const overlay = document.querySelector(`.overlay`);
const btnsCloseModal = document.querySelector(`.close-modal`);
// 이렇게 하면 같은 클래스의 요소 여러개 중에 첫번째 것만 선택됨
// const btnsOpenModal = document.querySelector(`.show-modal`);
// 이렇게 하면 다 선택됨 (NodeList 생성. array처럼 작동함.)
const btnsOpenModal = document.querySelectorAll(`.show-modal`);

// 이 영역(모달 창 열고 닫기)은 아래에 리팩토링 되어있음!
/*
// 모달 창 열기
for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener(`click`, function () {
    console.log(`Button Clicked`);
    // 'modal hidden' 클래스 요소들에서 'hidden' 클래스를 제거함으로써 화면에 나타나게 하기!
    // 특정 클래스를 제거하고 더해주고 하는 것은 자바스크립트로 css 스타일을 조절하는 주된 방법.
    // 여기서 주의: 이 때 괄호 안 클래스명 앞에 . 안 찍음. 셀렉터가 아니기 때문.
    modal.classList.remove(`hidden`);
    overlay.classList.remove(`hidden`);
  });
}

// close 버튼 또는 모달창 외부(오버레이 영역) 눌렀을 때 모달 창 사라지게 하기
btnsCloseModal.addEventListener(`click`, function () {
  modal.classList.add(`hidden`);
  overlay.classList.add('hidden');
});

overlay.addEventListener(`click`, function () {
  modal.classList.add(`hidden`);
  overlay.classList.add('hidden');
});
*/

// 리팩토링: 여러 번 사용되는 함수들을 이렇게 정리하고, argument로 사용하면 더 깔끔!
const openModal = function () {
  modal.classList.remove(`hidden`);
  overlay.classList.remove(`hidden`);
};

const closeModal = function () {
  modal.classList.add(`hidden`);
  overlay.classList.add(`hidden`);
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener(`click`, openModal);
}

btnsCloseModal.addEventListener(`click`, closeModal);
overlay.addEventListener(`click`, closeModal);

// 키보드 입력 이벤트 (글로벌 이벤트) 리슨하기
// document.addEventListener('keydown', function () {
//   console.log(`A key was pressed`);
// });
// 이 때는 아무 키나 눌러도 함수 동작. 그리고 그럴 때마다 매번 객체가 생성됨.
// 이벤트가 발생할 때, 이벤트 핸들러 함수를 통해 해당 이벤트에 대한 정보에 접근할 수 있다.
// 어떤 키가 눌렸는지 알아보자
document.addEventListener('keydown', function (e) {
  console.log(e);
  console.log(e.key); // 'e' 객체의 'key' property 출력. 어떤 키가 눌렸는지 볼 수 있다

  if (e.key === `Escape` && !modal.classList.contains(`hidden`)) {
    // 'Escape' 키가 눌렸고, modal이 'hidden' 클래스를 포함하고 있지 않다면!
    closeModal();
  }
});
// 키가 눌리면(이벤트 발생) -> 자바스크립트 엔진이 핸들러 함수를 호출하고 -> 이벤트 객체를 해당 함수의 argument로 parameter 'e'에 전달
