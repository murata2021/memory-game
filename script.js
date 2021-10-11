const gameContainer = document.getElementById("game");

let count=0; // to count picks
const twoCards=[];

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    newDiv.isMatch=false ///To compare cards picked

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click",handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {

  checkGameCompleted();

  if (twoCards.length<2 && event.target.isMatch!==true){
    twoCards.push(event.target)
    event.target.style.backgroundColor=event.target.classList[0]
  }
  if (twoCards.length===2){
    if (twoCards[0].classList[0]===twoCards[1].classList[0]){
      twoCards[0].isMatch=true
      twoCards[1].isMatch=true
      twoCards.pop()
      twoCards.pop()
    }
    else{
      setTimeout(function(){
        twoCards[0].style.backgroundColor=null
        twoCards[1].style.backgroundColor=null
        twoCards.pop()
        twoCards.pop()
      },1000)
    }
  }
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  console.log(twoCards)
  
  return twoCards
}

function checkGameCompleted(){
  let count=0
  for (let i of document.querySelector("#game").children){
    count+=i.isMatch
  }
  if(count===10){
    alert("Congrats!!!")

  }
}


// when the DOM loads
createDivsForColors(shuffledColors);
