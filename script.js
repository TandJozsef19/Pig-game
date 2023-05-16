"use strict";

// Jatekosok
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

// Gombok
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

// El
const diceEl = document.querySelector(".dice");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");

// valtozok
let diceRandom, currentscore, activePlayer, scores, playing;

// alap beallitasok
const init = () => {
  currentscore = 0;
  activePlayer = 0;
  scores = [0, 0];
  current0.textContent = 0;
  current1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  playing = true;

  diceEl.classList.add("hidden");

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
};
init();

// Jatekos valtas
const switchPlayer = () => {
  currentscore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
};

btnRoll.addEventListener("click", () => {
  if (playing) {
    // random Dobas
    let diceRandom = Math.trunc(Math.random() * 6 + 1);

    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${diceRandom}.png`;

    // Ha a dobas nem egyes
    if (diceRandom !== 1) {
      currentscore += diceRandom;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentscore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    scores[activePlayer] += currentscore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Ha eleri a 100at a dobasok osszege
    if (scores[activePlayer] >= 100) {
      playing = false;
      console.log("100⚽");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", () => {
  init();
});
