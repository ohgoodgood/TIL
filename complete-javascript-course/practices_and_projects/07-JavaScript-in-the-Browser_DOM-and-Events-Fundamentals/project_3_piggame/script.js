'use strict';

// sellecting elements
const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);
const diceEl = document.querySelector(`.dice`);
// 두 방법 다 가능~

// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add(`hidden`);
