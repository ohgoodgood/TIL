'use strict';
// rolling dice functionality
btnRoll.addEventListener(`click`, function () {
  // 1. generating a random dice roll
  const dice = Math.trunc(Math.random() * 6 + 1);

  // 2. display dice
  diceEl.classList.remove(`hidden`);
  diceEl.src = `dice-${dice}.png`;

  // 3. check for rolled 1: if true, switch to next player
  if (dice !== 1) {
    // add dice to the current score
    //currentScore = currentScore + dice;
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    current0El.textContent = currentScore; // shd be more dealt with later
  } else {
    // switch to next player
  }
});
