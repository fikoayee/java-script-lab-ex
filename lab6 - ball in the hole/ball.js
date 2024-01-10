// ============================ GAMEBOARD ============================
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// ============================ GAME SETTINGS ============================
let balls = [];
const numOfBalls = 5; // number of holes at the beginning
// const maxDistance = 300 * 300; // max allowed distance between balls to draw a line
let multiplierX = 20;
let multiplierY = 10;
let startInterval = setInterval(draw, 10);

// ============================ GAME ANIMATION ============================
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear game board
    drawBalls();
    wallBounce();
    checkDistance();
  }

// ----- get random value from specific range -----
function getRandomNumber(minValue, maxValue) {
    return Math.random() * (maxValue - minValue) + minValue;
  }

// ============================ DRAW BALLS WITH UPDATED VALUES ============================
function drawBalls() {
    for (let ball of balls) {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
      ctx.strokeStyle = "black";
      ctx.stroke();
      ctx.lineWidth = 2;
      ctx.closePath();
    }
  }

// ============================ CHANGE BALL DIRECTION IF BALL HITS BORDER ============================
function wallBounce() {
    for (let ball of balls) {
      // When the distance between center of the ball and border is same as the radius of the ball it will change movement direction
      if (
        ball.x + ball.dx > canvas.width - ball.radius ||
        ball.x + ball.dx < ball.radius
      ) {
        ball.dx = -ball.dx;
      }
      if (
        ball.y + ball.dy > canvas.height - ball.radius ||
        ball.y + ball.dy < ball.radius
      ) {
        ball.dy = -ball.dy;
      }
      // update coords
      ball.x += ball.dx;
      ball.y += ball.dy;
    }
  }











window.addEventListener('deviceorientation', onDeviceMove)

// alpha - z - 0
// beta - y - 90
// gamma - x - 0

function onDeviceMove(event) {
    console.log(event)
}

function moveZ(alphaValue){

}

function animate() {
    //    console.log(Date.now())
    // requestAnimationFrame(animate)
}

requestAnimationFrame(animate)