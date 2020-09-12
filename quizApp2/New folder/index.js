let score = 0;
let z = 0;
let questionDisplay = document.getElementById("question");
let optionDisplayA = document.getElementById("A");
let optionDisplayB = document.getElementById("B");
let optionDisplayC = document.getElementById("C");
let optionDisplayD = document.getElementById("D");
let scoreText = document.getElementById("score");
    
// question arrays
let questions = [
    {
        questionText :"Which of the following is a non metal that remains liquid at room temperature?" ,
        optionText :["A: Phosphorous" , "B: Bromine" , "C: Helium" , "D: Chlorine"],
        correctAnswer :"B: Bromine"
     } , 
    {
        questionText :"Which of the following is used in pencils?" ,
        optionText :["A: Graphite" , "B: Silicon" , "C: Charcoal" , "D: Phosphoroush"],
        correctAnswer :"A: Graphite"
    } ,
    {
        questionText :"Chlorophyll is a naturally occurring chelate compound in which central metal is" ,
        optionText :["A: copper" , "B: magnesium" , "C: iron" , "D: calcium"],
        correctAnswer :"B: magnesium"
    } ,
    {
        questionText :"Which of the following metals forms an amalgam with other metals?" ,
        optionText :["A: Tin" , "B: Mercury" , "C: Zinc" , "D: Lead"],
        correctAnswer :"B: Mercury"
    } ,
    {
        questionText :"Which of the following is used as a moderator in nuclear reactor?" ,
        optionText :["A: Graphite" , "B: Thorium" , "C: Radium" , "D: Ordinary Water"],
        correctAnswer :"A: Graphite"
    } ,
    {
        questionText :"Which among the following is a positively charged particle emitted by a radioactive element?" ,
        optionText :["A: Beta Ray" , "B: Alpha Ray" , "C: Cathode Ray" , "D: Gamma Ray"],
        correctAnswer :"B: Alpha Ray"
    } ,
    {
        questionText :"Very small time intervals are accurately measure by" ,
        optionText :["A: White dwarfs" , "B: Quartz clocks" , "C: Atomic clocks" , "D: Pulsars"],
        correctAnswer :"C: Atomic clocks"
    } ,
    {
        questionText :"What is part of a database that holds only one type of information?" ,
        optionText :["A: Report" , "B: Field" , "C: Record" , "D: File"],
        correctAnswer :"B: Field"
    } ,
    {
        questionText :"The purpose of choke in tube light is ?" ,
        optionText :["A: To decrease the current" , "B: To increase the current" , "C: To decrease the voltage momentarily" , "D: To increase the voltage momentarily"],
        correctAnswer :"D: Intensity of sound"
    } ,
    {
        questionText :"Who is largely responsible for breaking the German Enigma codes, created a test that provided a foundation for artificial intelligence?" ,
        optionText :["A: Alan Turing" , "B: Jeff Bezos" , "C: George Boole" , "D: Charles Babbage"],
        correctAnswer :"D: Intensity of sound"
    } 
];
// this will go into event loop
let timerId = setInterval(callMe , 10000);      // SetTimeout for 10-20 secs

// Displays Questions and Options on the DOM and console
// put this on timeout for 10 sec
function callMe(){
        console.log(questionDisplay.innerHTML = questions[z].questionText);
        console.log(optionDisplayA.innerHTML = questions[z].optionText[0]);
        console.log(optionDisplayB.innerHTML = questions[z].optionText[1]);
        console.log(optionDisplayC.innerHTML = questions[z].optionText[2]);
        console.log(optionDisplayD.innerHTML = questions[z].optionText[3]);  
       
        // mouse trigger for each button clicked
        // getting all the buttons as an array using query selector
        // event listener
        document.querySelectorAll("button").forEach(item => {
            item.addEventListener('click', handleClick)
        }); 
        // remove the classes from all options accept button
        removeClasses();
        // remove disabled property from the buttons
        removeDisabled();        
        // change the counter for next question
        z = changeCounter(z); 
        // clear interval if z is equal to legth of questions array
        if(z===questions.length){
            clearInterval(timerId); 
        }  
}

// handling click event of buttons
// disable all the buttons after clicking on one of the buttons
let handleClick = (event) =>{
        if(event.target.innerHTML === questions[z-1].correctAnswer){
            // If correct
            console.log("Correct");
            let id1 = event.target.getAttribute("id");
            let id = document.getElementById(""+id1);
            id.classList.add("Correct");
            disbaleAll();
            score += 10;                 
        }   
        // If incorrect 
        else {
            console.log("Incorrect");
            let id1 = event.target.getAttribute("id");
            let id = document.getElementById(""+id1);
            id.classList.add("Incorrect");
            disbaleAll();
        }
        scoreDisplay();
};

// changes the counter for questions and options text
function changeCounter(i){
    return i+1;
}

// remove the classes from all options accept button
function removeClasses(){
    optionDisplayA.className = "button";
    optionDisplayB.className = "button";
    optionDisplayC.className = "button";
    optionDisplayD.className = "button";
}

// Disable all buttons
function disbaleAll(){
    document.querySelectorAll("button").forEach(item => {
        item.disabled = true;
    })
};
// Enabe all the buttons
function removeDisabled(){
    document.querySelectorAll("button").forEach(item => {
        item.disabled = false;
    })
};

// function for checking the score once game is over
function scoreDisplay(){
        console.log(score);
        // change the inner HTML for score
        scoreText.innerHTML ="Score :" + score;    
}
// call for first question display without waiting for 10 seconds
callMe();
