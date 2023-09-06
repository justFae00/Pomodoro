const startPauseButton = document.getElementById("start-pause-button");
const resetButton = document.getElementById("reset-button");
const minute = document.getElementById("minute");
const second = document.getElementById("second");
const circle = document.getElementById("container");
const modeSelector = document.getElementById("mode-selector");
const runStatus = document.getElementById("run-status");
const soundController = document.getElementById("sound-controller");
const soundIcon = document.getElementById("sound-icon");

let currentMinute = 25;
let currentSecond = 0;

//start => true, pause => false
let onStart = false;

//sound on by default
let unmute = true;

let alarmAudio = new Audio();
alarmAudio.src = "assets/mixkit-cartoon-bubbles-pop-729.wav";

soundController.addEventListener("click", function () {
  if (unmute) {
    unmute = false;
    soundIcon.className = "fa-solid fa-volume-xmark";
  } else {
    unmute = true;
    soundIcon.className = "fa-solid fa-volume-high";
  }
});

modeSelector.addEventListener("change", function () {
  setMode();
});

startPauseButton.addEventListener("click", function () {
  if (!onStart) {
    startOperation();
    countDown();
  } else {
    pauseOperation();
  }
});

resetButton.addEventListener("click", function () {
  setMode();
});

function startOperation() {
  runStatus.className = "fa-solid fa-pause";

  container.style.animation = "border-change 30s infinite ease-in-out";
  container.style.animationPlayState = "running";

  onStart = true;
}

function pauseOperation() {
  runStatus.className = "fa-solid fa-play";

  container.style.animationPlayState = "paused";

  onStart = false;
}

//reset is pause + reset of animation
function resetOperation() {
  pauseOperation();
  container.style.animation = "none";
}

//recursive function to count down
function countDown() {
  if (onStart) {
    currentSecond--;
    if (currentSecond < 0) {
      currentMinute--;
      currentSecond = 59;
    }

    if (currentMinute == 0 && currentSecond == 0) {
      resetOperation();
      if (unmute) {
        alarmAudio.play();
      }
    } else {
      setTimeout(() => {
        countDown();
      }, 1000);
    }
  }

  displayTime();
}

//display minute and second in 2 digits format
function displayTime() {
  if (currentMinute < 10) {
    minute.innerHTML = "0" + currentMinute;
  } else {
    minute.innerHTML = currentMinute;
  }

  if (currentSecond < 10) {
    second.innerHTML = "0" + currentSecond;
  } else {
    second.innerHTML = currentSecond;
  }
}

//change values based on selector
function setMode() {
  if (modeSelector.value === "break") {
    currentMinute = 5;
  } else if (modeSelector.value === "long-break") {
    currentMinute = 10;
  } else {
    currentMinute = 25;
  }

  currentSecond = 0;

  resetOperation();
  displayTime();
}
