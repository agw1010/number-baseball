let list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let number = [];
for (let i = 0; i < 3; i++) {
    let select = Math.floor(Math.random() * list.length);
    number[i] = list.splice(select, 1)[0];
}
const strikeOrBall = document.querySelector(".strikeOrBall");
const guessField = document.querySelector(".guessField");
const guessSubmit = document.querySelector(".guessSubmit");
let strike = 0;
let ball = 0;
let guessCount = 1;
let resetButton;
let chanse = 8;

function checkGuess() {
    let userGuess = guessField.value;
    let userGuessArray = userGuess.split('');
    for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
            if (number[j] == userGuessArray[k]) {
                if (j === k) {
                    strike++;
                } else {
                    ball++;
                }
                break;
            }
        }
    }
    if (strike === 3) {
        strikeOrBall.textContent = `축하합니다 ${guessCount}번에 맞추셨습니다`;
        setGameOver();
    } else if (guessCount === 9) {
        strikeOrBall.textContent = `!!!GAME OVER!!! 정답은 ${number} 입니다`;
        setGameOver();
    } else {
        strikeOrBall.textContent = `strike : ${strike} ball : ${ball} 기회가 ${chanse}번 남았습니다`
        strike = 0;
        ball = 0;
    }
    guessCount++;
    chanse--;
    guessField.value = '';
    guessField.focus();
}
guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = '다시하기';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    guessCount = 1;

    const resetParas = document.querySelectorAll('.resultParas p');
    for (let i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    let number = [];
    for (let i = 0; i < 3; i++) {
        let select = Math.floor(Math.random() * list.length);
        number[i] = list.splice(select, 1)[0];
    }
    strike = 0;
    ball = 0;
}