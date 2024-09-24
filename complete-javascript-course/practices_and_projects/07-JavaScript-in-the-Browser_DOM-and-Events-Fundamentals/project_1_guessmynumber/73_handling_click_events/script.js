'use strict';

document.querySelector(`.check`).addEventListener(`click`, function () {
  const guess = Number(document.querySelector(`.guess`).value);
  console.log(guess, typeof guess);

  if (!guess) {
    document.querySelector(`.message`).textContent = `No Number!`;
  }
});
// in EventListener method, 1st argument is the event that we're wating for and 2nd argument is a function that shd be executed when the event happens.
// the function in EventListener is not called by us. it's called by JavaScript engine as soon as the event occurs.
