const gameInput = document.querySelector(".js-input-number");
const playButton = document.querySelector(".js-play-button");
const gameTip = document.querySelector(".js-game-tip");
const gameTry = document.querySelector(".js-game-try");
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
    } else if (gameNumber === 0 || gameNumber > 100 ) {
        gameTip.innerHTML = "El número debe estar entre 1 y 100";
        resetInput();
    } else if (gameNumber > randomNumber) {
        gameTip.innerHTML = "Demasiado alto";
        gameTry.innerHTML ++;
        resetInput();
    } else if (gameNumber < randomNumber) {
        gameTip.innerHTML = "Demasiado bajo"; 
        gameTry.innerHTML ++;
        resetInput();
    } else {
        gameTip.innerHTML = "Has ganado campeona!!!";
    }
}

function resetInput() {
    gameInput.value = "";
}

function resetGame() {
    resetInput();
    const randomNumber = getRandomInt(100);
    gameTip.innerHTML = "Escribe un número y dale a Prueba";
}

function playGame(event) {
    event.preventDefault();
    gameNumber();
}

playButton.addEventListener('click', playGame);