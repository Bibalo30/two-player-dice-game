'use strict';
//selectin elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores = [0, 0]; // Change scores to a let variable
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const initialize = function () {
    currentScore = 0;
    scores = [0, 0]; // Reassign a new array to scores
    playing = true;
    activePlayer = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//Rolling dice functionallity

btnRoll.addEventListener('click', function () {

    if (playing) {


        //1. generating random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2. display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        //3. Check for rolled 1
        if (dice !== 1) {
            //add dice tu current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //if true switch player
            switchPlayer();
        }
    }

});

btnHold.addEventListener('click', function () {
    if (playing) {
        //1. add current score to active players score
        scores[activePlayer] += currentScore;
        //scors[1] = scores[1] + currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //2. check if the player's score is >= 100
        if (scores[activePlayer] >= 100) {
            //Finish the game
            playing = false;
            diceEl.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }


        //Switch to the next player
        switchPlayer();
    }
});

btnNew.addEventListener('click', initialize);