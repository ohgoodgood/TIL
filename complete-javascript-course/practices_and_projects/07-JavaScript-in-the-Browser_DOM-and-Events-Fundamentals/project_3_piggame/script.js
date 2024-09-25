'use strict';

// sellecting elements
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);

const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);

const diceEl = document.querySelector(`.dice`); // ID, query 두 방법 다 가능~
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

// starting conditions
let scores, currentScore, activePlayer, playing; // declaring at global scope

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true; // 게임이 끝났는지 진행중인지에 대한 변수. true/false 값에 따라 logic이 실행되는지 아닌지를 간편하게 결정할 수 있다.

  diceEl.classList.add(`hidden`);

  score0El.textContent = 0;
  score1El.textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;

  document.querySelector(`.player--${activePlayer}`).classList.remove(`player--winner`);
  document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);
  document.querySelector(`.player--0`).classList.add(`player--active`);
};
init();

// switch player function
const switchPlayer = function () {
  // switch to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  // toggle method
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

// rolling dice functionality
btnRoll.addEventListener(`click`, function () {
  if (playing) {
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
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

// score hold functionality
btnHold.addEventListener(`click`, function () {
  if (playing) {
    // 1. add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    // 2. check if player's score is >= 10 and if so, finish the game
    if (scores[activePlayer] >= 10) {
      playing = false;
      diceEl.classList.add(`hidden`);
      document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
      document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

// reset(new game) button functionality
btnNew.addEventListener(`click`, init);
