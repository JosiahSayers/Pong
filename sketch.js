let leftPaddle;
let rightPaddle;
let ball;

let wHeight;
let wWidth;

let leftScore = 0;
let rightScore = 0;

let font;
let fontsize = 100;
const volume = 1;
let winSoundPlayCount = 0;

const AISpeed = 8;
const playerSpeed = 8;

let paused = false;

function preload(){
    font = loadFont('game_over.ttf');
    soundFormats('mp3', 'ogg', 'wav');
    paddleSound = loadSound('sounds/paddle.ogg');
    scoreSound = loadSound('sounds/score.ogg');
    wallSound = loadSound('sounds/wall.ogg');
    winSound = loadSound('sounds/win.wav');
}

function setup(){
    wHeight = windowHeight;
    wWidth = windowWidth;
    createCanvas(wWidth, wHeight);
    textFont(font);
    textSize(fontsize);
    textAlign(CENTER, CENTER);
    paddleSound.setVolume(volume);
    scoreSound.setVolume(volume);
    wallSound.setVolume(volume);
    //winSound.playMode(untilDone);

    leftPaddle = {
      x: 10,
      y: wHeight/2,
      fill: [255, 255, 255],
      width: 20,
      height: wHeight/5
    };
  
  rightPaddle = {
      x: wWidth - 30,
      y: wHeight/2,
      fill: [255, 255, 255],
      width: 20,
      height: wHeight/5
    };

  ball = {
    x: wWidth/2,
    y: random(wHeight*0.3, wHeight*0.7),
    size: 20,
    xSpeed: 5,
    ySpeed: 5,
    numberOfBounces: 1
    };
}

function draw(){
        background(0);
        frameRate(60);
        fill(255);

        text(leftScore, wWidth/3, 20);
        text(rightScore, wWidth/3 + wWidth/3, 20);
        fill(leftPaddle.fill[0], leftPaddle.fill[1], leftPaddle.fill[2]);
        rect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
        fill(rightPaddle.fill[0], rightPaddle.fill[1], rightPaddle.fill[2]);
        rect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
        fill(255);
        square(ball.x, ball.y, ball.size);
    if(paused == false){
        rightMovement();
        ballMovement();
        AI();
        winnerCheck();
    }
    else {
        text('Paused, enter to continue', wWidth/2, wHeight/2);
    }
    keyPressed();
}

function rightMovement(){
    if(keyIsDown(DOWN_ARROW) && rightPaddle.y + rightPaddle.height < wHeight){
        rightPaddle.y += playerSpeed;
    }
    else if(keyIsDown(UP_ARROW) && rightPaddle.y > 0){
        rightPaddle.y -= playerSpeed;
    }
}

function ballMovement(){
    // collision with wall
    if((ball.y + ball.size) > wHeight)
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
    if(ball.x < 30 && ball.y > leftPaddle.y && ball.y < (leftPaddle.y + leftPaddle.height))
    {
        ball.x += 5;
        ball.xSpeed *= -1;
        ball.numberOfBounces += 0.05;
        paddleSound.play();
    }
    if(ball.x > wWidth - 50 && ball.y > rightPaddle.y && ball.y < (rightPaddle.y + rightPaddle.height))
    {
        ball.x -= 5;
        ball.xSpeed *= -1;
        ball.numberOfBounces += 0.05;
        paddleSound.play();
    }

    // goal
    if((ball.x + ball.size) > wWidth)
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

    ball.y += ball.ySpeed * ball.numberOfBounces;
    ball.x += ball.xSpeed * ball.numberOfBounces;
}

function reset(){
    rightPaddle.y = wHeight/2;
    leftPaddle.y = wHeight/2;
    ball.y = random(wHeight*0.3, wHeight*0.7);
    ball.x = wWidth/2;
    ball.numberOfBounces = 1;
}

function winnerCheck(){
    if(rightScore > 9){
        ball.xSpeed = 0;
        ball.ySpeed = 0;
        text('Right Wins', wWidth/2, 75);
        if(!winSound.isPlaying() && winSoundPlayCount < 1)
        {
            winSound.play();
            winSoundPlayCount++;
        }
        rightPaddle.fill = [0, 255, 0];
        leftPaddle.fill = [255, 0, 0];
    }

    if(leftScore > 9){
        ball.xSpeed = 0;
        ball.ySpeed = 0;
        text('Left Wins', wWidth/2, 75);
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
    let paddleCenter = leftPaddle.y + leftPaddle.height/2;

    if(paddleCenter < ball.y){
        if(leftPaddle.y < wHeight - leftPaddle.height) {
            leftPaddle.y += AISpeed;
        }
    }
    else if(paddleCenter > ball.y){
        if (leftPaddle.y > 0) {
            leftPaddle.y -= AISpeed;
        }
    }
}

function keyPressed() {
    if (keyCode === ESCAPE) {
        paused = true;
        keyCode = 0;
    } else if (keyCode === ENTER) {
        paused = false;
        keyCode - 0;
    }
}