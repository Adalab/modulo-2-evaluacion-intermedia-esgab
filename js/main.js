"use strict";

// QUERYSELECTORS
const playerNumberInput = document.querySelector(".js_playerNumberInput");
const testButton = document.querySelector(".js_testButton");
const clueBox = document.querySelector(".js_clueBox");
const triesBox = document.querySelector(".js_triesBox");
const triesBoxCounterNumber = document.querySelector(".js_triesBoxCounterNumber");
const resetButton = document.querySelector(".js_resetButton");

// GLOBAL VARIABLES
let randomNumber = getRandomNumber(100);
let triesCounter = 0;

//FUNCTIONS
function getRandomNumber(max) { 
    return Math.ceil(Math.random() * max); 
} 

function setRandomNumber() {
    randomNumber = getRandomNumber(100);
    console.log(`Mi número aleatorio es ${randomNumber}`);
}

function getPlayerNumber() {
    return parseInt(playerNumberInput.value);
}

function writeClue(message) {
    clueBox.innerHTML = message;
}

function updateTries() {
    triesCounter++;
    triesBoxCounterNumber.innerHTML = triesCounter;
}

function resetTries() {
    triesCounter = 0;
    triesBoxCounterNumber.innerHTML = triesCounter;
}

function checkNumbers(playerNumber) {
    console.log({playerNumber, randomNumber})

    if (isNaN(playerNumber) || playerNumber === " ") {
        writeClue("Escribe un número por favor");
    } 
    else if (playerNumber < 1 || playerNumber > 100 ) {
        writeClue("El número debe estar entre 1 y 100");
    } 
    else if (playerNumber === randomNumber) {
        writeClue("Has ganado campeona!!!");
        triesBox.innerHTML = `Enhorabuena! Te ha llevado ${triesCounter} intentos ganar, refresca la página para volver a jugar!`;
        updateTries();
    }
    else if (playerNumber > randomNumber) {
        writeClue("Demasiado alto");
        updateTries();
    } 
    else if (playerNumber < randomNumber) {
        writeClue("Demasiado bajo");
        updateTries();
    }
}

function resetPlayerInputNumber() {
    playerNumberInput.value = "";
}

function handleClickTestButton(event) {
    event.preventDefault();
    const playerNumber = getPlayerNumber();
    checkNumbers(playerNumber);
}

function handleClickResetButton(event) {
    event.preventDefault();
    setRandomNumber();
    resetTries();
    writeClue("Pista: Escribe un número y dale a Prueba");
    resetPlayerInputNumber();
}

// EVENTS
testButton.addEventListener('click', handleClickTestButton);
resetButton.addEventListener('click', handleClickResetButton);

// CODE WHEN LOADING THE PAGE
console.log(`Mi número aleatorio es ${randomNumber}`);
resetPlayerInputNumber();