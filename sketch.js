const leftPaddle = {
    x: 10,
    y: 160,
    fill: [255, 255, 255]
};

const rightPaddle = {
    x: 770,
    y: 160,
    fill: [255, 255, 255]
};

const ball = {
    x: 200,
    y: 400,
    size: 20,
    xSpeed: 5,
    ySpeed: 5
};

let leftScore = 0;
let rightScore = 0;

let font;
let fontsize = 100;
const volume = 1;
let winSoundPlayCount = 0;

const AISpeed = 4;


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
        fill(leftPaddle.fill[0], leftPaddle.fill[1], leftPaddle.fill[2]);
        rect(leftPaddle.x, leftPaddle.y, 20, 80);
        fill(rightPaddle.fill[0], rightPaddle.fill[1], rightPaddle.fill[2]);
        rect(rightPaddle.x, rightPaddle.y, 20, 80);
        fill(255);
        square(ball.x, ball.y, ball.size);

        rightMovement();
        //leftMovement();
        ballMovement();
        AI();
        winnerCheck();
}

function rightMovement(){
    if(keyIsDown(DOWN_ARROW) && rightPaddle.y < 320){
        rightPaddle.y += 5;
    }
    else if(keyIsDown(UP_ARROW) && rightPaddle.y > 0){
        rightPaddle.y -= 5;
    }
}

function leftMovement(){
    if(keyIsDown(87) && leftY > 0){
        leftPaddle.y -= 5;
    }
    else if(keyIsDown(83) && leftY < 320){
        leftPaddle.y += 5;
    }
}

function ballMovement(){
    // collision with wall
    if((ball.y + ball.size) > 400)
    {
        ball.ySpeed *= -1;
        wallSound.play();
    }
    if(ball.y < 0)
    {
        ball.ySpeed *= -1;
        wallSound.play();
    }

    // collision with paddle
    if(ball.x < 30 && ball.y > leftPaddle.y && ball.y < (leftPaddle.y + 80))
    {
        ball.x += 5;
        ball.xSpeed *= -1;
        paddleSound.play();
    }
    if(ball.x > 750 && ball.y > rightPaddle.y && ball.y < (rightPaddle.y + 80))
    {
        ball.x -= 5;
        ball.xSpeed *= -1;
        paddleSound.play();
    }

    // goal
    if((ball.x + ball.size) > 800)
    {
        leftScore += 1;
        scoreSound.play();
        reset();
    }
    if(ball.x < 0)
    {
        rightScore += 1;
        scoreSound.play();
        reset();
    }

    ball.y += ball.ySpeed;
    ball.x += ball.xSpeed;
}

function reset(){
    rightPaddle.y = 160;
    leftPaddle.y = 160;
    ball.y = 200;
    ball.x = 400;
}

function winnerCheck(){
    if(rightScore > 9){
        ball.xSpeed = 0;
        ball.ySpeed = 0;
        text('Right Wins', 400, 75);
        if(!winSound.isPlaying() && winSoundPlayCount < 1)
        {
            winSound.play();
            winSoundPlayCount++;
        }
        rightPaddle.fill = [0,255,0];
        leftPaddle.fill = [255, 0, 0];
    }

    if(leftScore > 9){
        ball.xSpeed = 0;
        ball.ySpeed = 0;
        text('Left Wins', 400, 75);
        if(!winSound.isPlaying() && winSoundPlayCount < 1)
        {
            winSound.play();
            winSoundPlayCount++;
        }
        leftPaddle.fill = [0,255,0];
        rightPaddle.fill = [255, 0, 0];

    }
}

function AI(){
    let paddleCenter = leftPaddle.y + 40;

    if(paddleCenter < ball.y){
        leftPaddle.y += AISpeed;
    }
    else if(paddleCenter > ball.y){
        leftPaddle.y -= AISpeed;
    }

}