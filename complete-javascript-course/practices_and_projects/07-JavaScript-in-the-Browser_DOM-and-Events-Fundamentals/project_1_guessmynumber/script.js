'use strict';

const secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20; // 데이터를 DOM에서 읽어오는 방식도 가능하지만, 그보다는 코드 내에 데이터를 작성해 주는 것이 좋다! 데이터를 DOM에 전적으로 의존해서 확인하는 것보다는 코드 자체에서 확인(참조)할 수 있는 편이 좋음.
document.querySelector(`.number`).textContent = secretNumber;

// in EventListener method, 1st argument is the event that we're wating for and 2nd argument is a function that shd be executed when the event happens.
// the function in EventListener is not called by us. it's called by JavaScript engine as soon as the event occurs.
document.querySelector(`.check`).addEventListener(`click`, function () {
  const guess = Number(document.querySelector(`.guess`).value);
  console.log(guess, typeof guess);

  // when there's no input
  if (!guess) {
    document.querySelector(`.message`).textContent = `No Number!`;

    // when player wins
  } else if (guess === secretNumber) {
    document.querySelector(`.message`).textContent = `Correct Number!`;

    document.querySelector(`body`).style.backgroundColor = `#60b347`;

    document.querySelector(`.number`).style.width = `30rem`;

    // 자바스크립트로 css를 조정하면 html 문서에 in-line style로 입력된다! 우선순위 때문인가?

    // when guess is too high
  } else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector(`.message`).textContent = `Too High!`;
      score--;
      document.querySelector(`.score`).textContent = score;
    } else {
      document.querySelector(`.message`).textContent = `You lost the game :(`;
      document.querySelector(`.score`).textContent = 0;
    }

    // when guess is too low
  } else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector(`.message`).textContent = `Too Low!`;
      score--;
      document.querySelector(`.score`).textContent = score;
    } else {
      document.querySelector(`.message`).textContent = `You lost the game :(`;
      document.querySelector(`.score`).textContent = 0;
    }
  }
});
