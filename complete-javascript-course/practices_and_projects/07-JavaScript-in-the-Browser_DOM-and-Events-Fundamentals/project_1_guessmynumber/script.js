'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20; // 데이터를 DOM에서 읽어오는 방식도 가능하지만, 그보다는 코드 내에 데이터를 작성해 주는 것이 좋다! 데이터를 DOM에 전적으로 의존해서 확인하는 것보다는 코드 자체에서 확인(참조)할 수 있는 편이 좋음.
let highscore = 0;

// 여러 번 반복되는 기능은 함수로 한 번 지정해두고 쓰면 좋다 (리팩토링 관점)
const displayMessage = function (message) {
  document.querySelector(`.message`).textContent = message;
};

document.querySelector(`.check`).addEventListener(`click`, function () {
  // in EventListener method, 1st argument is the event that we're wating for and 2nd argument is a function that shd be executed when the event happens.
  // the function in EventListener is not called by us. it's called by JavaScript engine as soon as the event occurs.
  const guess = Number(document.querySelector(`.guess`).value);
  console.log(guess, typeof guess);

  // when there's no input
  if (!guess) {
    // document.querySelector(`.message`).textContent = `No Number!`; 위에서 지정해둔 함수 호출
    displayMessage(`No number!`);

    // when guess is right
  } else if (guess === secretNumber) {
    // document.querySelector(`.message`).textContent = `Correct Number!`;
    displayMessage(`Correct number!`);

    document.querySelector(`.number`).textContent = secretNumber;

    document.querySelector(`body`).style.backgroundColor = `#60b347`;

    document.querySelector(`.number`).style.width = `30rem`;
    // 자바스크립트로 css를 조정하면 html 문서에 in-line style로 입력된다! 우선순위 때문인가?

    // highscore functionality
    if (score > highscore) {
      highscore = score;
      document.querySelector(`.highscore`).textContent = highscore;
    }

    // when guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector(`.message`).textContent = guess > secretNumber ? `Too High!` : `Too Low!`
      displayMessage(guess > secretNumber ? `Too High!` : `Too Low!`);
      score--;
      document.querySelector(`.score`).textContent = score;
    } else {
      // document.querySelector(`.message`).textContent = `You lost the game`;
      displayMessage(`You lost the game`);
      document.querySelector(`.score`).textContent = 0;
    }
  }
});

/* 'again' button - my approach
document.querySelector(`.again`).addEventListener(`click`, function () {
  document.querySelector(`.score`).textContent = 20;
  document.querySelector(`.number`).textContent = `?`;
  document.querySelector(`.message`).textContent = `Start Guessing...`;
  document.querySelector(`body`).style.backgroundColor = `#222`;
  document.querySelector(`.number`).style.width = `15rem`;
});
*/

// 'again' button - lecture approach
document.querySelector(`.again`).addEventListener(`click`, function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  // document.querySelector(`.message`).textContent = `Start guessing...`;
  displayMessage(`Start guessing...`);
  document.querySelector(`.score`).textContent = score;
  document.querySelector(`.number`).textContent = `?`;
  document.querySelector(`.guess`).value = ``;
  document.querySelector(`body`).style.backgroundColor = `#222`;
  document.querySelector(`.number`).style.width = `15rem`;
});
