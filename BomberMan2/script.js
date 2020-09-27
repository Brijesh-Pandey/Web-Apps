let container = document.getElementById("Container");
let scoreId = document.getElementById("score");
let restart = document.getElementById("restart");
let bombIcon = `<i class="fas fa-bomb fa-2x" style="color:black"></i>`;
let exclamationIcon = `<i class="fas fa-exclamation" style="color:red"></i>`;
let id = 1;
let random = [];
let score = 0;

let checkNeighbours = (cell) => {
  // console.log(cell);
  // console.log(cell.id);
  let c = 0;
  let arr = [];

  arr[0] = document.getElementById((Number(cell.id) + 1).toString());
  arr[1] = document.getElementById((Number(cell.id) - 1).toString());
  arr[2] = document.getElementById((Number(cell.id) + 9).toString());
  arr[3] = document.getElementById((Number(cell.id) - 9).toString());
  arr[4] = document.getElementById((Number(cell.id) + 10).toString());
  arr[5] = document.getElementById((Number(cell.id) - 10).toString());
  arr[6] = document.getElementById((Number(cell.id) + 8).toString());
  arr[7] = document.getElementById((Number(cell.id) - 8).toString());

  if (Number(cell.id) % 9 === 0) {
    arr[0] = null;
    // arr[1] = null;
    // arr[2] = null;
    // arr[3] = null;
    arr[4] = null;
    // arr[5] = null;
    // arr[6] = null;
    arr[7] = null;
  }
  if (Number(cell.id) % 9 === 1) {
    // arr[0] = null;
    arr[1] = null;
    // arr[2] = null;
    // arr[3] = null;
    // arr[4] = null;
    arr[5] = null;
    arr[6] = null;
    // arr[7] = null;
  }

  for (let i = 0; i < 8; i++) {
    if (arr[i] !== null && arr[i].classList.contains("bomb")) {
      c = c + 1;
    }
  }
  cell.innerHTML = c;
};

// handles right click

let handleRightClick = (event) => {
  event.preventDefault();
  event.target.innerHTML = exclamationIcon;
  event.target.style.backgroundColor = "grey";
};

// Random generation of bomb positions
const randomGeneration = function () {
  for (let i = 0; i < 9; i++) {
    let ran1 = Math.ceil(Math.random() * 10);
    let ran2 = Math.ceil(Math.random() * 10);
    if (ran1 * ran2 < 82) {
      random[i] = ran1 * ran2;
      console.log(random[i]);
      // console.log(typeof random[i]);
      // event.target.classList.add("bomb");
      let v = document.getElementById(random[i]);
      v.classList.add("bomb");
    }
  }
};
// Creates board and puts id and classes for each box
const board = function () {
  id = 1;
  for (let i = 0; i < 9; i++) {
    let row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < 9; j++) {
      let box = document.createElement("div");
      box.className = "box";
      box.setAttribute("id", id.toString());
      row.appendChild(box);
      box.value = id; // to handle clicking of an element more than once
      id++;
    }
    container.appendChild(row);
  }
  // call randomGeneration function to put bomb position
  randomGeneration();
};

// Update Score
const updateScore = function () {
  scoreId.innerHTML = `Score : ${score}`;
};

// Disable click after loosing or winning the game
const disableClick = function () {
  // disable the click using css property
  container.style.pointerEvents = "none";
};
// enable click
const enableClick = function () {
  // enable the click using css property
  container.style.pointerEvents = "auto";
};
// Bomb match in box
const bombMatch = function () {
  for (let i = 0; i < 9; i++) {
    if (random[i] === Number(event.target.id)) {
      disableClick();
      return true;
    }
  }
  return false;
};
// Handle Click for event listener
const handleClick = (event) => {
  if (event.target.value === 0) return; // if already clicked;
  if (bombMatch()) {
    event.target.style.backgroundColor = "red";
    event.target.innerHTML = bombIcon;
    // apply lost modal here
    modal.style.display = "flex";
    console.log("You lose");
    return;
  } else {
    event.target.style.backgroundColor = "green";
    checkNeighbours(event.target);
    score++;
    event.target.value = 0;
    // update score
    updateScore();
    if (score === 71) {
      console.log("You won");
      // disable click
      disableClick();
      // apply won modal here
      modal.style.display = "flex";
    }
  }
};
// Add Event Listener for click event on the Container Box
container.addEventListener("click", handleClick);

// Add Event Listener for click event on the Container Box
container.addEventListener("contextmenu", handleRightClick);

// restart event listener
restart.addEventListener("click", (event) => {
  container.innerHTML = "";
  score = 0;
  updateScore();
  enableClick();
  board();
});
board();
