let staticHoles = [];
let movingHoles = [];
let tunnelHoles = [];
let holes = [];
let holeId = -1;
let startDate =0;
// ============================ GAMEBOARD ============================
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let beta = 0;
let gamma = 0;

window.addEventListener("deviceorientation", (event) => {
  beta = event.beta; // |  [-180, 180)   def: 0
  gamma = event.gamma; // ---  [-90, 90)    def: 0
});

// ============================ SETTINGS ============================
// ----- holes -----
const maxDistance = 300; // max distance between hole & ball
const holeRadius = 30;
const numOfStaticHoles = 2;
const numOfMovingHoles = 2;
const numOfTunnels = 2;
const movingHoleSpeed = 350;

// ----- ball -----
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
const ballRadius = 25;
let speedX = 0;
let speedY = 0;
const speedMulitplier = 0.008;

// ============================ TOOLS ============================
// ----- get random value from specific range -----
function getRandomNumber(minValue, maxValue) {
  return Math.random() * (maxValue - minValue) + minValue;
}

// ============================ CREATE HOLES ============================
function createHoles(amount, isTunnel, isMoving) {
  for (let i = 0; i < amount; i++) {
    holeId++;
    let x = getRandomNumber(holeRadius, canvas.width - holeRadius);
    let y = getRandomNumber(holeRadius, canvas.height - holeRadius);
    const newHole = {
      id: holeId,
      x: x,
      y: y,
      x1: x,
      y1: y,
      isTunnel: isTunnel,
      isMoving: isMoving,
      x2: getRandomNumber(holeRadius, canvas.width - holeRadius),
      y2: getRandomNumber(holeRadius, canvas.height - holeRadius),
    };
    if (isTunnel) {
      tunnelHoles.push(newHole);
    } else if (isMoving && isTunnel === false) {
      movingHoles.push(newHole);
    } else if (isMoving === false && isTunnel === false) {
      staticHoles.push(newHole);
    } else {
      // do nothing
    }
    holes = [...staticHoles, ...movingHoles, ...tunnelHoles];
  }
}

// ============================ REMOVE HOLE ============================
function removeHole(holeToRemove) {
  holes = holes.filter((hole) => hole.id !== holeToRemove.id);
  if (holeToRemove.isMoving) {
    movingHoles = movingHoles.filter((hole) => hole.id !== holeToRemove.id);
  } else {
    staticHoles = staticHoles.filter((hole) => hole.id !== holeToRemove.id);
  }
  checkWin()
}

// ============================= HANDLE WIN ============================
function checkWin() {
  if (movingHoles.length === 0 && staticHoles.length === 0) {
    handleRestart();
  }
}
function handleRestart(){
  records.push(getPlayTime())
  saveRecordToLocalStorage();
  tunnelHoles = [];
  createHoles(1, true, false); // create tunnels
  createHoles(1, false, false); // create static holes
  createHoles(1, false, true); // create moving holes
}
// ============================ MOVE HOLES ============================
function moveAllHoles() {
  for (let hole of movingHoles) {
    moveHole(hole);
  }
}

function moveHole(hole) {
  const dx = hole.x - hole.x2;
  const dy = hole.y - hole.y2;
  const squaredDistance = dx * dx + dy * dy;

  if (squaredDistance > movingHoleSpeed) {
    const ratio = movingHoleSpeed / squaredDistance;
    hole.x -= dx * ratio;
    hole.y -= dy * ratio;
  } else {
    hole.x = hole.x2;
    hole.y = hole.y2;

    let tempx2 = hole.x2;
    let tempy2 = hole.y2;

    hole.x2 = hole.x1;
    hole.y2 = hole.y1;

    hole.x1 = tempx2;
    hole.y1 = tempy2;
  }
}

// ============================ DRAW HOLES ============================
function drawHoles() {
  for (let hole of holes) {
    if (!hole.isTunnel) {
      ctx.beginPath();
      ctx.arc(hole.x, hole.y, holeRadius, 0, Math.PI * 2, false);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.closePath();
    } else {
      ctx.beginPath();
      ctx.arc(hole.x, hole.y, holeRadius, 0, Math.PI * 2, false);
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 6;
      ctx.stroke();
      ctx.closePath();
    }
  }
}

// ============================ CHECK DISTANCE BETWEEN BALL & HOLES ============================
function checkDistance() {
  for (let i = 0; i < holes.length; i++) {
    const dx = ballX - holes[i].x;
    const dy = ballY - holes[i].y;
    const squaredDistance = dx * dx + dy * dy;
    if (squaredDistance < maxDistance) {
      handleBallInHole(holes[i]);
    }
  }
}

// ----- handle ball in hole -----
function handleBallInHole(filledHole) {
  if (!filledHole.isTunnel) {
    removeHole(filledHole);
  } else {
    teleportBall(filledHole);
  }
}

// ----- teleport ball -----
function teleportBall(hole) {
  ballX = hole.x2;
  ballY = hole.y2;
}

// ============================ DRAW BALL ============================
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2, false);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

// ============================ STOP THE BALL IF HITS BORDER ============================
function wallBounce() {
  // When the distance between center of the ball and border is same as the radius of the ball it will change movement direction
  if (
    ballX + speedX > canvas.width - ballRadius ||
    ballX + speedX < ballRadius
  ) {
    speedX = -speedX;
  }
  if (
    ballY + speedY > canvas.height - ballRadius ||
    ballY + speedY < ballRadius
  ) {
    speedY = -speedY;
  }
  // update coords
  ballX += speedX;
  ballY += speedY;
}

// ============================ CALCULATE BALL SPEED ============================
function calculateSpeed() {
  signX = Math.sign(beta);
  signY = Math.sign(gamma);
  let speedYn = -(180 - (Math.abs(beta) + 180)); // |  [-180, 180)   def: 0              360   => 1 : 1
  let speedXn = -(90 - (Math.abs(gamma) + 90)); // ---  [-90, 90)    def: -90           180 => 1 : 2
  speedY = Math.sign(beta) * speedYn * speedMulitplier;
  speedX = Math.sign(gamma) * speedXn * speedMulitplier;
  ballX += speedX;
  ballY += speedY;
}

// ============================ LOCAL STORAGE & RECORD FUNCTIONS ============================

// ----- record timer -----
function startTimer(){
  startDate = new Date();
}
function getPlayTime(){
  var endDate   = new Date();
  var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
  return seconds;
}

// ----- local storage -----
function saveRecordToLocalStorage() {
  localStorage.setItem("records", JSON.stringify(records));
}

function getRecordsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("records")) || [];
}

function clearLocalStorage() {
  localStorage.clear();
}

// ======== START GAME =========
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear game board
  calculateSpeed();
  drawHoles();
  drawBall();
  wallBounce();
  checkDistance();
  moveAllHoles();
}

function start() {
  records = getRecordsFromLocalStorage();
  if(!records){
    records = [];
  }
  startInterval = setInterval(draw, 10);
  startTimer();
}

function fifi() {
  console.log(records);
}
createHoles(1, true, false); // create tunnels
createHoles(1, false, false); // create static holes
createHoles(1, false, true); // create moving holes
start();
