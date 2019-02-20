let rightY = 160;
let leftY = 160;
const rightX = 770;
const leftX = 10;

let ballY = 200;
let ballX = 400;
const ballSize = 20;
let ballYSpeed = 5;
let ballXSpeed = 5;

let leftScore = 0;
let rightScore = 0;

let font;
let fontsize = 100;
const volume = 1;
let winSoundPlayCount = 0;


function preload(){
    font = loadFont('game_over.ttf');
    soundFormats('mp3', 'ogg', 'wav');
    paddleSound = loadSound('sounds/paddle.ogg');
    scoreSound = loadSound('sounds/score.ogg');
    wallSound = loadSound('sounds/wall.ogg');
    winSound = loadSound('sounds/win.wav');
}

function setup(){
    createCanvas(800, 400);
    textFont(font);
    textSize(fontsize);
    textAlign(CENTER, CENTER);
    paddleSound.setVolume(volume);
    scoreSound.setVolume(volume);
    wallSound.setVolume(volume);
    //winSound.playMode(untilDone);
}

function draw(){
        background(0);
        frameRate(60);
        fill(255);

        text(leftScore, 300, 20);
        text(rightScore, 500, 20);
        let leftPaddle = rect(leftX, leftY, 20, 80);
        let rightPaddle = rect(rightX, rightY, 20, 80);
        let ball = square(ballX, ballY, ballSize);

        rightMovement();
        //leftMovement();
        ballMovement();
        AI();
        winnerCheck();
}

function rightMovement(){
    if(keyIsDown(DOWN_ARROW) && rightY < 320){
        rightY += 5;
    }
    else if(keyIsDown(UP_ARROW) && rightY > 0){
        rightY -= 5;
    }
}

function leftMovement(){
    if(keyIsDown(87) && leftY > 0){
        leftY -= 5;
    }
    else if(keyIsDown(83) && leftY < 320){
        leftY += 5;
    }
}

function ballMovement(){
    // collision with wall
    if((ballY + ballSize) > 400)
    {
        ballYSpeed *= -1;
        wallSound.play();
    }
    if(ballY < 0)
    {
        ballYSpeed *= -1;
        wallSound.play();
    }

    // collision with paddle
    if(ballX < 30 && ballY > leftY && ballY < (leftY + 80))
    {
        ballX += 5;
        ballXSpeed *= -1;
        paddleSound.play();
    }
    if(ballX > 750 && ballY > rightY && ballY < (rightY + 80))
    {
        ballX -= 5;
        ballXSpeed *= -1;
        paddleSound.play();
    }

    // goal
    if((ballX + ballSize) > 800)
    {
        leftScore += 1;
        scoreSound.play();
        reset();
    }
    if(ballX < 0)
    {
        rightScore += 1;
        scoreSound.play();
        reset();
    }

    ballY += ballYSpeed;
    ballX += ballXSpeed;
}

function reset(){
    rightY = 160;
    leftY = 160;
    ballY = 200;
    ballX = 400;
}

function winnerCheck(){
    if(rightScore > 9){
        ballXSpeed = 0;
        ballYSpeed = 0;
        text('Right Wins', 400, 75);
        if(!winSound.isPlaying() && winSoundPlayCount < 1)
        {
            winSound.play();
            winSoundPlayCount++;
        }
    }

    if(leftScore > 9){
        ballXSpeed = 0;
        ballYSpeed = 0;
        text('Left Wins', 400, 75);
        if(!winSound.isPlaying() && winSoundPlayCount < 1)
        {
            winSound.play();
            winSoundPlayCount++;
        }
    }
}

function AI(){
    let paddleCenter = leftY + 40;

    if(paddleCenter < ballY){
        leftY += 5;
    }
    else if(paddleCenter > ballY){
        leftY -= 5;
    }

}