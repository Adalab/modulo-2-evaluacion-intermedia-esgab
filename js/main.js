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

const tooHighMessages = [
    "Upss, qué frío, es demasiado alto",
    "Es un número demasiado alto",
    "Estás muy lejos, demasiado alto",
    "Sigue intentándolo, demasiado alto",
    "Prueba otra vez, demasiado alto"
]

const tooLowMessages = [
    "Upss, hace frío, es demasiado bajo",
    "Es un número demasiado bajo",
    "Estás muy alejado, demasiado bajo",
    "Sigue probando, demasiado bajo",
    "Inténtalo de nuevo, demasiado bajo"
] 

const highMessages = [
    "Estás aproximándote, pero es alto",
    "Es un número alto, pero te acercas",
    "Te estás acercando, aún es alto",
    "Estás cerca, pero es alto",
    "Es alto, pero sigue probando, estás cerca"
] 

const lowMessages = [
    "Es bajo, pero te estás acercando",
    "Es un número bajo pero estás cerca",
    "Es bajo, pero sigue intentándolo, estás cerca",
    "Sigue probando, estás cerca, un poco bajo",
    "Vamos, estás cerca, algo bajo"
] 

const closeHighMessages = [
    "¡Estás muy muy cerca! Un poquito alto",
    "Estás casi casi, un poco alto",
    "Te estás acercando mucho, un poco alto",
    "Estás realmente cerca, un poco alto",
    "Es alto, pero sigue probando, estás muy muy cerca"
] 

const closeLowMessages = [
    "¡Te acercas muchísimo! Un poquito bajo",
    "Es un número un poco bajo pero estás muy cerca",
    "Es un poco bajo, pero estás super cerca",
    "Estás realmente cerca, un poco bajo",
    "Vamos, estás muy cerca, un poco bajo"
]

//FUNCTIONS
function getRandomNumber(max) { 
    return Math.ceil(Math.random() * max); 
} 

function setRandomNumber() {
    randomNumber = getRandomNumber(100);
    console.log(`Mi número aleatorio es ${randomNumber}`);
}

function getRandomIndex(max) { 
    return Math.floor(Math.random() * max); 
} 

function getRandomMessage(array) {
    let randomMessage = array[getRandomIndex(array.length)];
    return randomMessage;
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

    if ( isNaN(playerNumber) || playerNumber === " " ) {
        writeClue("¡Mecachis! Escribe un número por favor");
    } 
    else if ( playerNumber < 1 || playerNumber > 100 ) {
        writeClue("¿A dónde vas? El número debe estar entre 1 y 100");
    } 
    else if ( playerNumber === randomNumber ) {
        showRestartGameButton();
        writeClue(`El ${playerNumber} es el número correcto<br>¡¡Has ganado campeona!!`);
        updateTries();
    }
    else if ( (playerNumber - randomNumber) <= 0 && (playerNumber - randomNumber) >= -5 ) {
        writeClue(getRandomMessage(closeLowMessages));
        updateTries();
    } 
    else if ( (playerNumber - randomNumber) <= 0 && (playerNumber - randomNumber) >= -10 ) {
        writeClue(getRandomMessage(lowMessages));
        updateTries();
    } 
    else if ( (playerNumber - randomNumber) <= 5 && (playerNumber - randomNumber) >= 0 ) {
        writeClue(getRandomMessage(closeHighMessages));
        updateTries();
    }      
    else if ( (playerNumber - randomNumber) <= 10 && (playerNumber - randomNumber) >= 0 ) {
        writeClue(getRandomMessage(highMessages));
        updateTries();
    }  
    else if ( playerNumber > randomNumber ) {
        writeClue(getRandomMessage(tooHighMessages));
        updateTries();
    } 
    else if ( playerNumber < randomNumber ) {
        writeClue(getRandomMessage(tooLowMessages));
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