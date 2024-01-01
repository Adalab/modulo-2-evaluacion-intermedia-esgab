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
    if (triesCounter === 16) {
        writeClue("Has superado los 15 intentos, vuelve a comenzar");
        showRestartGameButton() 
    }
    else  {
        triesBoxCounterNumber.innerHTML = triesCounter;
    }
}

function showRestartGameButton() {
    testButton.value = "Volver a jugar";
    playerNumberInput.classList.add("hidden");
    testButton.classList.add("radius");
}

function showTestButton() {
    testButton.value = "Prueba";
    playerNumberInput.classList.remove("hidden");
    testButton.classList.remove("radius");
}

function resetTries() {
    triesCounter = 0;
    triesBoxCounterNumber.innerHTML = triesCounter;
}

function checkNumbers(playerNumber) {
    console.log({playerNumber, randomNumber});

    if (isNaN(playerNumber) || playerNumber === " ") {
        addTextColorRed(clueBox);
        writeClue("¡Mecachis! Escribe un número por favor");
    } 
    else if (playerNumber < 1 || playerNumber > 100 ) {
        writeClue("¿A dónde vas? El número debe estar entre 1 y 100");
    } 
    else if (playerNumber === randomNumber) {
        showRestartGameButton();
        writeClue(`El ${playerNumber} es el número correcto<br>¡¡Has ganado campeona!!`);
        updateTries();
    }
    else if ( (playerNumber - randomNumber) <= 0 && (playerNumber - randomNumber) >= -5) {
        writeClue("¡Te acercas muchísimo! Un poquito bajo");
        updateTries();
    } 
    else if ( (playerNumber - randomNumber) <= 0 && (playerNumber - randomNumber) >= -10) {
        writeClue("Es bajo, pero te estás acercando");
        updateTries();
    } 
    else if ( (playerNumber - randomNumber) <= 5 && (playerNumber - randomNumber) >= 0 ) {
        writeClue("¡Estás muy muy cerca! Un poquito alto");
        updateTries();
    }      
    else if ( (playerNumber - randomNumber) <= 10 && (playerNumber - randomNumber) >= 0 ) {
        writeClue("Es alto, pero te estás acercando");
        updateTries();
    }  
    else if (playerNumber > randomNumber) {
        writeClue("Upss, qué frío, es demasiado alto");
        updateTries();
    } 
    else if (playerNumber < randomNumber) {
        writeClue("Upss, qué frío, es demasiado bajo");
        updateTries();
    }
}

function resetPlayerInputNumber() {
    playerNumberInput.value = "";
}

function handleClickTestButton(event) {
    event.preventDefault();
    if (testButton.value === "Volver a jugar") {
        setRandomNumber();
        resetTries();
        writeClue("Pista: Escribe un número y dale a Prueba");
        showTestButton();
        resetPlayerInputNumber();
    } 
    else {
        const playerNumber = getPlayerNumber();
        checkNumbers(playerNumber);
    }
}

function handleClickResetButton(event) {
    event.preventDefault();
    setRandomNumber();
    resetTries();
    writeClue("Pista: Escribe un número y dale a Prueba");
    showTestButton();
    resetPlayerInputNumber();
}

// EVENTS
testButton.addEventListener('click', handleClickTestButton);
resetButton.addEventListener('click', handleClickResetButton);

// CODE WHEN LOADING THE PAGE
console.log(`Mi número aleatorio es ${randomNumber}`);
resetPlayerInputNumber();