// ============================ GAMEBOARD ============================
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// ============================ GAME SETTINGS ============================
let balls = [];
const numOfBalls = 5; // number of balls at the beginning
const maxDistance = 300 * 300; // max allowed distance between balls to draw a line
const energyExchangeValue = 0.00125; // amount of energy to add/remove from balls per interval
let multiplierX = 20;
let multiplierY = 10;
const minMultipierX = 20;
const maxMultipierX = 30;
const minMultiplierY = 10;
const maxMultiplierY = 20;
const mouseForce = 0.05;
let startInterval = setInterval(draw, 10);

// ============================ GAME ANIMATION ============================
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear game board
  drawBalls();
  wallBounce();
  checkDistance();
  checkDistanceCursor();
}

// ============================ HANDLE MULTIPLIER CHANGE ============================
function handleMultiplierChange() {
  const x = document.getElementById("multiplier-x").value;
  const y = document.getElementById("multiplier-y").value;
  if (
    multiplierX >= minMultipierX &&
    multiplierX <= maxMultipierX &&
    multiplierY >= minMultiplierY &&
    multiplierY <= maxMultiplierY
  ) {
    multiplierX = x;
    multiplierY = y;
    console.log(multiplierX);
    console.log(multiplierY);
  } else {
    console.log("nie dziala");
  }
}

// ============================ RANDOM BALL  ============================
// ----- ball limits -----
const minRadius = 5;
const maxRadius = 40;
const minHeight = 120;
const maxHeight = 600;
const minWidth = 1;
const maxWidth = 10;
const minSpeed = 0.5;
const maxSpeed = 2;
const minWeight = 1;
const maxWeight = 4;

// ----- calculate speed of the ball -----
function calculateBallEnergy(speed, mass) {
  return Math.abs(multiplierX * speed + multiplierY * mass);
}

// ----- get random value from specific range -----
function getRandomNumber(minValue, maxValue) {
  return Math.random() * (maxValue - minValue) + minValue;
}

// ----- create movement direction for new ball -----
function movementDirection(d) {
  const randomNum = Math.random();
  if (randomNum < 0.5) {
    return d;
  } else {
    return -d;
  }
}

// ----- create id for new ball -----
function getNewId() {
  if (balls.length === 0) {
    return 1;
  } else {
    return balls[balls.length - 1].id + 1;
  }
}

// ----- return new random ball obj -----
function createRandomBall() {
  const speed = movementDirection(getRandomNumber(minSpeed, maxSpeed));
  const mass = getRandomNumber(minWeight, maxWeight);
  const newBall = {
    id: getNewId(),
    x: canvas.width / getRandomNumber(minWidth, maxWidth),
    y: canvas.height - getRandomNumber(minHeight, maxHeight),
    dx: speed,
    dy: speed,
    mass: mass,
    energy: calculateBallEnergy(speed, mass),
    radius: calculateBallEnergy(speed, mass),
  };
  return newBall;
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

// ========================== BALL CLICK HANDLER ============================
// ---------- Add click event listener to canvas ----------
canvas.addEventListener("click", function (event) {
  const rect = canvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;

  for (let ball of balls) {
    const dx = clickX - ball.x;
    const dy = clickY - ball.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < ball.radius + 20) {
      // 20 - additional margin for click handle
      handleBallClick(ball);
      break; // Exit loop after handling click for single ball
    }
  }
});
// ----- remove clicked ball and create 2 new random balls -----
function handleBallClick(clickedBall) {
  removeBall(clickedBall);
  addNewBall();
  addNewBall();
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

// ============================ AGARIO MECHANIC ============================
// ----- check distance between balls -----
function checkDistance() {
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      const dx = balls[i].x - balls[j].x;
      const dy = balls[i].y - balls[j].y;
      const squaredDistance = dx * dx + dy * dy;
      if (squaredDistance < maxDistance) {
        drawLine(balls[i].x, balls[i].y, balls[j].x, balls[j].y);
        exchangeEnergy(balls[i], balls[j]);
      }
    }
  }
}
// ----- draw line between balls -----
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1); // coords where line start
  ctx.lineTo(x2, y2); // coords where line end
  ctx.lineWidth = 2;
  ctx.strokeStyle = "black";
  ctx.stroke();
}
// ----- exchange energy between balls (change size & speed & remove ball) -----
function exchangeEnergy(ballOne, ballTwo) {
  if (ballOne.radius > ballTwo.radius) {
    ballOne.radius += 0.1; // increase/decrease size of ball
    ballTwo.radius -= 0.1;
    ballOne.dx = calculateSpeedDecrease(ballOne.dx); // increase/descrease speed of ball
    ballOne.dy = calculateSpeedDecrease(ballOne.dy);
    ballTwo.dx = calculateSpeedIncrease(ballTwo.dx);
    ballTwo.dy = calculateSpeedIncrease(ballTwo.dy);
    if (ballTwo.radius <= 0) {
      removeBall(ballTwo);
    }
  } else {
    ballTwo.radius += 0.1;
    ballOne.radius -= 0.1;
    ballTwo.dx = calculateSpeedDecrease(ballTwo.dx);
    ballTwo.dy = calculateSpeedDecrease(ballTwo.dy);
    ballOne.dx = calculateSpeedIncrease(ballOne.dx);
    ballOne.dy = calculateSpeedIncrease(ballOne.dy);
    if (ballOne.radius <= 0) {
      removeBall(ballOne);
    }
  }
}
// ----- speed calculations -----
function calculateSpeedIncrease(ballSpeed) {
  return Math.sign(ballSpeed) * (Math.abs(ballSpeed) + energyExchangeValue);
}
function calculateSpeedDecrease(ballSpeed) {
  const calculatedSpeed =
    Math.sign(ballSpeed) * (Math.abs(ballSpeed) - energyExchangeValue);
  if (Math.abs(calculatedSpeed) < 0.2) {
    return Math.sign(calculatedSpeed) * 0.2;
  } else {
    return calculatedSpeed;
  }
}

// ============================ ADD/REMOVE BALL ============================
function addNewBall() {
  balls.push(createRandomBall());
}
function removeBall(ballToRemove) {
  balls = balls.filter((ball) => ball.id !== ballToRemove.id);
}

// ============================ START/RESTART/RESET BOARD ============================
function newGame() {
  for (let i = numOfBalls; i > 0; i--) {
    addNewBall();
  }
  saveInitialBallsToLocalStorage();
}

function restart() {
  clearInterval(startInterval);
  balls = getInitialBallsFromLocalStorage();
  draw();
}
function start() {
  startInterval = setInterval(draw, 10);
}

function reset() {
  clearInterval(startInterval);
  balls = [];
  newGame();
  draw();
}

// ============================ LOCAL STORAGE RELATED FUNCTIONS ============================

function saveInitialBallsToLocalStorage() {
  localStorage.setItem("balls", JSON.stringify(balls));
}

function getInitialBallsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("balls")) || [];
}

function clearLocalStorage() {
  localStorage.clear();
}

// ============================ MOUSE INTERRACTION ============================
let mouseX = 0;
let mouseY = 0;

canvas.addEventListener("mousemove", (event) => {
  mouseX = event.clientX - canvas.offsetLeft;
  mouseY = event.clientY - canvas.offsetTop;
});

// ----- check distance between balls and mouse cursor -----
function checkDistanceCursor() {
  let posX = 0;
  let posY = 0;
  for (let i = 0; i < balls.length; i++) {
    const dx = balls[i].x - mouseX;
    const dy = balls[i].y - mouseY;
    const squaredDistance = dx * dx + dy * dy;
    const ballRadius = balls[i].radius
    if (squaredDistance < 10000) {
      // https://stackoverflow.com/questions/49806292/make-a-ball-on-a-canvas-slowly-move-towards-the-mouse
      posX =
        balls[i].x + (dx / squaredDistance) * (squaredDistance * mouseForce);
      posY =
        balls[i].y + (dy / squaredDistance) * (squaredDistance * mouseForce);

        // ----- checks if new coords are out of gameboard -----
      balls[i].x = posX-ballRadius < 0 ? 0+ballRadius : posX+ballRadius < 1280 ? posX : 1280-ballRadius
      balls[i].y = posY-ballRadius < 0 ? 0+ballRadius : posY+ballRadius < 720 ? posY : 720-ballRadius
    }
  }
}
// -----------------------------------------------
newGame();
