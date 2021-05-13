'use strict'

const field = document.querySelector('#field');
const ball = document.querySelector('#ball');
const racketL = document.querySelector('#racket-left');
const racketR = document.querySelector('#racket-right');

const fieldHeight = 400;
const fieldWidth = 800;
field.style.height = fieldHeight + 'px';
field.style.width = fieldWidth + 'px';

const racketHeight = fieldHeight / 3;
const racketWidth = 10;
racketL.style.height = racketR.style.height = racketHeight + 'px';
racketL.style.width = racketR.style.width = racketWidth + 'px';

const racketSpeed = 3;

const racketLPosX = 0;
const racketRPosX = fieldWidth - racketWidth;
racketL.style.left = racketLPosX + 'px';
racketR.style.left = racketRPosX + 'px';

let racketLPosY;
let racketRPosY;

const ballDiameter = 25;
const ballRadius = ballDiameter / 2;
ball.style.height = ball.style.width = ballDiameter + 'px';
let ballX;
let ballY;
let speedX = 5;
let speedY = 5;

let lWins = document.querySelector('#left-wins');
let rWins = document.querySelector('#right-wins');
let lWinsNum = parseInt(lWins.textContent);
let rWinsNum = parseInt(rWins.textContent);

let isGameActive = false;
const button1 = document.querySelector('#button1');

let pressedKeyW = false;
let pressedKeyS = false;
let pressedArrowUp = false;
let pressedArrowDown = false;
let key;

positioning();

function start() {
    if (isGameActive) { return; }
    isGameActive = true;
    button1.setAttribute('disabled', '');
    positioning();
    requestAnimationFrame(ballMove);
}

function positioning() {
    ballX = (fieldWidth / 2) - (ballDiameter / 2);
    ballY = (fieldHeight / 2) - (ballDiameter / 2);
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    racketLPosY = (fieldHeight / 2) - (racketHeight / 2);
    racketRPosY = (fieldHeight / 2) - (racketHeight / 2);
    racketL.style.top = racketLPosY + 'px';
    racketR.style.top = racketRPosY + 'px';

    if (Math.round(Math.random())) {
        speedX *= -1;
    }
    if (Math.round(Math.random())) {
        speedY *= -1;
    }
}

function ballMove() {
    ballX += speedX;
    ballY += speedY;

    if ((ballX + ballDiameter) >= (fieldWidth - racketWidth - 1)
        && (ballY - ballRadius) > racketRPosY
        && (ballY + ballRadius) < (racketRPosY + racketHeight))
    {
        speedX = speedX * -1;
    } else if (ballX <= (racketWidth + 1)
        && (ballY - ballRadius) > racketLPosY
        && (ballY + ballRadius) < (racketLPosY + racketHeight))
    {
        speedX = speedX * -1;
    } else if (ballX >= (fieldWidth - ballDiameter)) {
        ballX = fieldWidth - ballDiameter;
        ball.style.left = ballX + 'px';
        lWinsNum +=1;
        lWins.textContent = lWinsNum;
        isGameActive = false;
        button1.removeAttribute('disabled');
        return;
    }

    if (ballX <= 0) {
        ballX = 0;
        ball.style.left = ballX + 'px';
        rWinsNum += 1;
        rWins.textContent = rWinsNum;
        isGameActive = false;
        button1.removeAttribute('disabled');
        return;
    } else if (ballY >= (fieldHeight - ballDiameter)) {
        speedY = speedY * -1;
        ballY = fieldHeight - ballDiameter;
    } else if (ballY <= 0) {
        speedY = speedY * -1;
        ballY = 0;
    }
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
    requestAnimationFrame(ballMove);
}

window.addEventListener('keydown', racketsControlCheck);
window.addEventListener('keyup', keyUp);

function racketsControlCheck(EO) {
    EO = EO || window.event;
    if (!isGameActive || EO.repeat) {
        return;
    }

    key = EO.code;
    console.log('key Down:', key);

    if (key === 'ShiftLeft') {
        pressedKeyW = true;
    } else if (key === 'ControlLeft') {
        pressedKeyS = true;
    } else if (key === 'ArrowUp') {
        pressedArrowUp = true;
    } else if (key === 'ArrowDown') {
        pressedArrowDown = true;
    } else {
        return;
    }

    if (pressedKeyW && (racketLPosY > 0)) {
        EO.preventDefault();
        requestAnimationFrame(leftRacketMoveUp);
    } else if (pressedKeyS && (racketLPosY < (fieldHeight - racketHeight))) {
        EO.preventDefault();
        requestAnimationFrame(leftRacketMoveDown);
    } else if (pressedArrowUp && (racketRPosY > 0)) {
        EO.preventDefault();
        requestAnimationFrame(rightRacketMoveUp);
    } else if (pressedArrowDown && (racketRPosY < (fieldHeight - racketHeight))) {
        EO.preventDefault();
        requestAnimationFrame(rightRacketMoveDown);
    }
}

function leftRacketMoveUp() {
    if (pressedKeyW && racketLPosY > 0) {
        racketLPosY -= racketSpeed;
        racketL.style.top = racketLPosY + 'px';
        requestAnimationFrame(leftRacketMoveUp);
    }
}

function leftRacketMoveDown() {
    if (pressedKeyS && (racketLPosY < (fieldHeight - racketHeight))) {
        racketLPosY += racketSpeed;
        racketL.style.top = racketLPosY + 'px';
        requestAnimationFrame(leftRacketMoveDown);
    }
}

function rightRacketMoveUp() {
    if (pressedArrowUp && (racketRPosY > 0)) {
        racketRPosY -= racketSpeed;
        racketR.style.top = racketRPosY + 'px';
        requestAnimationFrame(rightRacketMoveUp);
    }
}

function rightRacketMoveDown() {
    if (pressedArrowDown && (racketRPosY < (fieldHeight - racketHeight))) {
        racketRPosY += racketSpeed;
        racketR.style.top = racketRPosY + 'px';
        requestAnimationFrame(rightRacketMoveDown);
    }
}

function keyUp() {
    if (key === 'ShiftLeft') {
        pressedKeyW = false;
    } else if (key === 'ControlLeft') {
        pressedKeyS = false;
    } else if (key === 'ArrowUp') {
        pressedArrowUp = false;
    } else if (key === 'ArrowDown') {
        pressedArrowDown = false;
    }
    console.log('key UP:', key)
}