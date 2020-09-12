let players = [];
let turn = 0;
let gameOver = false;
let dimension = parseInt(document.getElementById("dimensions").value);
let board = new Array(dimension)
  .fill("")
  .map(() => new Array(dimension).fill(""));

const changeDimension = (event) => {
  dimension = parseInt(event.target.value);
  board = new Array(dimension)
    .fill("")
    .map(() => new Array(dimension).fill(""));
};

document
  .getElementById("dimensions")
  .addEventListener("change", changeDimension);
  
  // This function unhides the grid and disable the input boxes after validating players name
const startGame = () => {
  let input1 = document.getElementById("p1");   // player1 input box id
  let input2 = document.getElementById("p2");    // player2 input box id
  let select = document.getElementById("dimensions");  // dimesnion input box id

  let player1 = input1.value;   // name of player 1
  let player2 = input2.value;   // name of player 2
  
  // Validating player names by calling isEmpty function
  // ALerts the user if the name is not entered

  if (isEmpty(player1) || isEmpty(player2)) {
    alert("Player name is required");
    return;
  }
   // Disabling the name textboxes after name has been validated
  input1.setAttribute("disabled", true);
  input2.setAttribute("disabled", true);
  select.setAttribute("disabled", true);
  
  // This code unhides the grid and disable the input boxes after validating players name 
  let game = document.getElementById("game-container");
  game.classList.remove("hide");
  // Pushing players name to players array
  players.push(player1);
  players.push(player2);
  // Displays whose turn is it?
  document.getElementById("turn").innerHTML ="<pre>" + players[turn % 2] + "'s turn" + "\n" + "</pre>" ;
  initGame();
};

// Displays O and X as by the turn of player
const handleClick = (cell, i, j) => {
  const el = cell;
  if (el.innerHTML !== "" || gameOver) {
    return;
  }

  board[i][j] = turn % 2 === 0 ? "X" : "O";
  el.innerHTML = board[i][j];

  if (calculateWinner()) {
    alert(players[turn % 2] + " won!!");
    gameOver = true;
    return;
  }
  turn++;
  // Displays whose turn is it?
  document.getElementById("turn").innerHTML =  "<pre>" + players[turn % 2] + "'s turn" + "\n" + "</pre>" ;

  if (turn === dimension * dimension) {
    alert("Game is drawn");
    gameOver = true;
    return;
  }
};

// Create Grid Using methods append child and createElement
const initGame = () => {
  let gameContainer = document.getElementById("game-container");
  for (let i = 0; i < dimension; i++) {
    let row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < dimension; j++) {
      let cell = document.createElement("div");
      cell.addEventListener("click", (event) => handleClick(cell, i, j));    // To handle Click we have to add listener
      cell.className = "cell";  // Setting Classname
      row.appendChild(cell);  // Adding cell to Parent i.e row
    }
    gameContainer.appendChild(row); // Adding row to Parent i.e grid_container
  }
};

// THis method  Checks for Winner
const calculateWinner = () => {
  // first check for all rows in board and then for col and then for diagonals
  let len = board.length;
  if (turn < len) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    if (board[i].every((el) => el === board[i][0] && el !== "")) {
      return true;
    }
    let start_col_val = board[0][i];
    let count = 1;
    for (let j = 1; j < len; j++) {
      if (start_col_val === board[j][i] && start_col_val !== "") {
        count++;
      }
    }
    if (count === len) {
      return true;
    }
  }

  // check for diagonal

  let i = board[0][0];
  let j = 0;
  while (j < len) {
 
    if (board[0][0] === "") {
      break;
    }
    if (board[j][j] !== i) {
      break;
    } else {
      j++;
    }
  }

  if (j === len) {
    return true;
  }

  let rev_i = 0;
  let rev_j = len - 1;
  let rev_val = board[rev_i][rev_j];

  while (rev_i < len) {
    if (board[rev_i][rev_j] === "") {
      break;
    }
    if (rev_val !== board[rev_i][rev_j]) {
      break;
    } else {
      rev_i++;
      rev_j--;
    }
  }

  if (rev_i === len) {
    return true;
  }

  return false;
};
// this function trims if sapaces are given as the name and
//returns false only iff spaces are there or there is no player name
const isEmpty = (value) => !value || !value.trim();

// Reloads the Page
const reset = () => {
  location.reload();
};
