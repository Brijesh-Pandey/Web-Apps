// this code selects a random item form the animals array
const randomNameGenerator = () => {
    let animals = ["python" ,"elephant" , "lion" , "tiger" , "wolf" , "dog" , "cat" , "fox" , "frog" , "snake"];
    let num = Math.random();
    let word = animals[Math.ceil(num*animals.length-1)];
    return word;
}
let word = randomNameGenerator();
let wordContainer = document.getElementById("Word");
let lives = 5;
let heart = document.getElementById("rem");
for (let i = 0; i < lives; i++) {
  heart.innerHTML += `<i class="fas fa-heart fa-4x" id = ${
    "h" + i.toString()
  } ></i>`;
  // document.getElementsByClassName("fas").setAttribute("id", i.toString());
}

let KO = false;
let gameOver = () => {
  for (let i = 0; i < word.length; i++) {
    document.getElementById(i).innerHTML = "X";
  }
  KO = true;
};

for (let i = 0; i < word.length; i++) {
  let letter = document.createElement("div");
  letter.className = "letter";
  letter.classList.add(word[i]);
  letter.setAttribute("id", i.toString());
  wordContainer.appendChild(letter);
}

const keyPressed = (event) => {
  if (KO) return;
  console.log(event.key);

  let key = event.key.toLowerCase();
  let letters = document.getElementsByClassName(key);
  if (letters.length === 0) {
    lives--;
    console.log("lives reduced by 1");
    document.getElementById("h" + lives.toString()).style.color = "black";
    if (lives === 0) {
      gameOver();
    }
  }
  for (let i = 0; i < letters.length; i++) {
    letters[i].innerHTML = key;
  }
};
document.addEventListener("keydown", keyPressed);
