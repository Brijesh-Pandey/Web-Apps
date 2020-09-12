let count = 0;
// Event listener
window.addEventListener("keydown", (event) => {
  if (event.key === "Shift" && document.shiftTime) {
    count = (count + 1) % 5;
    const diff = Date.now() - document.shiftTime;
    // for my understanding
    console.log(document.shiftTime + " " +diff + " " +parseInt(diff / 1000, 10) + " " +count);
    // if difference is more tha a second than dont include that shift key press
    if (parseInt(diff / 1000, 10) > 1) {
      count = 1;
      console.log("hello1");
    }
    // if differnece between the kry press is less than a sec
    if (parseInt(diff / 1000, 10) < 5 && count === 0) {
      alert("Sticky Keys");
    }
    document.shiftTime = Date.now();
  }
  // this will be triggered when my first time shift is pressed and it will make shiftTime as true and set the current time 
  // every time u load the page this segment will be executed first when ever a shift is pressed 
  else if (event.key === "Shift") {
    console.log("hello");
    document.shiftTime = Date.now();
  }
});