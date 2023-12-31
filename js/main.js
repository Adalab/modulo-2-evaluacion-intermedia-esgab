"use strict";

const gameInput = document.querySelector(".js-input-number");
const playButton = document.querySelector(".js-play-button");
const gameTip = document.querySelector(".js-game-tip");
const gameAllTip = document.querySelector(".js-game-all-tip");
const gameTry = document.querySelector(".js-game-try");
const gameAllTry = document.querySelector(".js-game-all-try");
let count = 0;
gameInput.value = "";
const randomNumber = getRandomInt(100);
console.log(randomNumber);

function getRandomInt(max) {
    return Math.ceil(Math.random() * max);
}

function gameNumber() {
    const gameNumber = parseInt(gameInput.value);
    console.log(gameNumber);

    if (isNaN(gameNumber) || gameNumber === " ") {
        gameTip.innerHTML = "Escribe un número por favor";
    } else if (gameNumber < 1 || gameNumber > 100 ) {
        gameTip.innerHTML = "El número debe estar entre 1 y 100";
        resetInput();
    } else if (gameNumber > randomNumber) {
        gameTip.innerHTML = "Demasiado alto";
        count ++;
        resetInput();
    } else if (gameNumber < randomNumber) {
        gameTip.innerHTML = "Demasiado bajo"; 
        count ++;
        resetInput();
    } else {
        gameAllTip.innerHTML = "Has ganado campeona!!!";
        count ++;
        gameAllTry.innerHTML = `Enhorabuena! te ha llevado ${count} intentos ganar, refresca la página para volver a jugar!`;
    }
    gameTry.innerHTML = count;
}

function resetInput() {
    gameInput.value = "";
}

function playGame(event) {
    event.preventDefault();
    gameNumber();
}

playButton.addEventListener('click', playGame);