let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game is Started!");
    started = true;

    levelUp();
  }
});

function btnflash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  // Random Button Choose:-

  let randIdx = Math.floor(Math.random() * 4);
  let randomcolor = btns[randIdx];
  let randombtn = document.querySelector(`.${randomcolor}`);
  // console.log(randIdx);
  // console.log(randomcolor);
  // console.log(randombtn);
  gameSeq.push(randomcolor);
  console.log(gameSeq);
  btnflash(randombtn);
}

function checkAns(idx) {
  // console.log("Current Level:-", level);

  // let idx = level - 1;
  if (userSeq[idx] === gameSeq[idx]) {
    // console.log("Same Value")
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br>Press any key to start again.`;
    document.querySelector("body").style.backgroundColor= "red"
    // var error = new Audio('error-call-to-attention-129258.mp3');
    // error.addEventListener("click", function() {
    //   playSound(error);
    // });
    
    setTimeout(function(){
      document.querySelector("body").style.backgroundColor= "white"
    },500)
    reset();
  }
}

function btnPress() {
  // console.log(this);
  let btn = this;
  userflash(btn);

  let usercolor = btn.getAttribute("id");
  console.log(usercolor);
  userSeq.push(usercolor);

  checkAns(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
  btn.addEventListener("click", btnPress);
}
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level= 0
}
// Create audio elements for each sound
var sound1 = new Audio('1.5.wav');
var sound2 = new Audio('2.5.wav');
var sound3 = new Audio('4.5.wav');
var sound4 = new Audio('6.wav');

// Function to play the sound when div is clicked
function playSound(sound) {
  // Get the number of times the div is clicked
  var clickCount = parseInt(sound.getAttribute("data-clicks")) || 0;

  // Increment the click count
  clickCount++;

  // Update the click count attribute on the div
  sound.setAttribute("data-clicks", clickCount);

  // Play the sound multiple times
  for (var i = 0; i < clickCount; i++) {
    sound.cloneNode(true).play();
  }
}

// Add event listeners to each div
document.getElementById("red").addEventListener("click", function() {
  playSound(sound1);
});

document.getElementById("yellow").addEventListener("click", function() {
  playSound(sound2);
});

document.getElementById("green").addEventListener("click", function() {
  playSound(sound3);
});

document.getElementById("purple").addEventListener("click", function() {
  playSound(sound4);
});


