let container = document.getElementById("Container");
let scoreId = document.getElementById("score");
let restart = document.getElementById("restart")
let id = 1;
let random = [];
let gameover = false;
let score = 0;

// Random generation of bomb positions
const randomGeneration = function(){
  for (let i = 0; i < 9; i++) {
    let ran1 = Math.ceil(Math.random() * 10);
    let ran2 = Math.ceil(Math.random() * 10);
    random[i] = ran1 * ran2;
    console.log(random[i]);
  }
}
// Creates board and puts id and classes for each box
const board = function(){
  id = 1;
  for(let i = 0 ; i < 9 ; i++){
    let row = document.createElement("div");
    row.className = "row";
    for(let j = 0 ; j < 9 ; j++){
      let box = document.createElement("div");
      box.className = "box";
      box.setAttribute("id",id.toString());
      row.appendChild(box);
      box.value = id;       // to handle clicking of an element more than once
      id++;      
    }
    container.appendChild(row);
  }
  // call randomGeneration function to put bomb position
  randomGeneration();
}

// Update Score
const updateScore = function(){
  scoreId.innerHTML = `Score : ${score}`;
}

// Disable click after loosing or winning the game
const disableClick = function(){
  // disable the click using css property
  container.style.pointerEvents = "none";
}
// enable click
const enableClick = function(){
  // enable the click using css property
  container.style.pointerEvents = "auto";
}
// Bomb match in box
const bombMatch = function(){
  for(let i = 0 ; i < 9 ; i++){
    if(gameover) return;
    if(random[i]===Number(event.target.id)){
      disableClick();
      return true;
    }
  }
  return false;
}
// Handle Click for event listener
const handleClick = (event)=>{
  if(event.target.value===0) return;  // if already clicked;
  if(bombMatch()){
    event.target.style.backgroundColor = "red";
    gameover = true;
    // apply lost modal here
    modal.style.display = "flex";
    console.log("You lose");
    return;
  }
  else{
    event.target.style.backgroundColor = "green";
    score++;
    event.target.value = 0;
    // update score
    updateScore();
    if(score===71){
      console.log("You won");
      // disable click
      disableClick();
      // apply won modal here
      modal.style.display = "flex";
    }
  }
}
// Add Event Listener for click event on the Container Box
container.addEventListener("click" , handleClick);

// restart event listener
restart.addEventListener("click" , (event)=>{
  // container.innerHTML="";
  // score = 0;
  // updateScore();
  // enableClick();
  // board();
  location.reload();
})
board();