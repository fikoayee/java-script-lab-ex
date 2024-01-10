document.addEventListener("keypress", onKeyPress);

const melodyKeys = [];

const canalOne = [];
const canalTwo = [];
const canalThree = [];
const canalFour = [];

let bpmValue = 120;
let metronomIsEnable = false;
let metronomInterval = ''

// slider bpm related
var slider = document.getElementById("bpm");





const KeyToSound = {
  a: document.querySelector("#s1"),
  s: document.querySelector("#s2"),
  d: document.querySelector("#s3"),
  f: document.querySelector("#s4"),
};

function onKeyPress(event) {
  let sound = "";
  switch (event.key) {
    case "a":
      sound = KeyToSound[event.key];
      sound.play(sound);
      canalOne.push(event.key);
      break;
    case "s":
      sound = KeyToSound[event.key];
      sound.play(sound);
      canalTwo.push(event.key);
      break;
    case "d":
      sound = KeyToSound[event.key];
      sound.play(sound);
      canalThree.push(event.key);
      break;
    case "f":
      sound = KeyToSound[event.key];
      sound.play(sound);
      canalFour.push(event.key);
      break;
  }
}

function playSoundWithDelay(key, index) {
  setTimeout(() => {
    const sound = KeyToSound[key];
    sound.play(sound);
  }, index * 800);
}

function onPlayAll() {
  onPlay(canalOne);
  onPlay(canalTwo);
  onPlay(canalThree);
  onPlay(canalFour);
}

async function onPlay(canal) {
  canal.forEach((key, index) => {
    playSoundWithDelay(key, index);
  });
}

function onPlaySingle(canal) {
  onPlay(canal);
}

function deleteMelody(canal) {
  canal.splice(0);
}

function onMentronomClick(){
    bpmValue = slider.value
    metronom(bpmValue)
}

function metronom(bpm) {
  const metronom = new Audio("./sounds/snare.wav");
  if (metronomIsEnable === false) {
    metronomInterval = setInterval(() => {
      metronom.play();
    }, 10000/bpm);
    metronomIsEnable = true;
    console.log(metronomIsEnable);
    console.log(bpm)
  }
  else if (metronomIsEnable === true) {
    clearInterval(metronomInterval);
    metronomIsEnable = false;
    console.log("off");
    console.log(bpm)
  }
}

// ----------------------------------------------

function onPlaySelected() {
  const one = document.getElementById("canalOne");
  const two = document.getElementById("canalTwo");
  const three = document.getElementById("canalThree");
  const four = document.getElementById("canalFour");

  if (one.checked === true) {
    onPlay(canalOne);
  }
  if (two.checked === true) {
    onPlay(canalTwo);
  }
  if (three.checked === true) {
    onPlay(canalThree);
  }
  if (four.checked === true) {
    onPlay(canalFour);
  }
}
