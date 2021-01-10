// tic tac toe alternative ... pipe connector, first team to cross the ocean wins
// need to animate connection though

let currentPlayer = "playerOne"

// puts even listeners on all squares -- and also prevents another
// for loop puts eventlistener on
// could also use forEach method which is how webdev/kubow does it "cellEleents.forEach(cell => {cell.addEventListener...)"
const gridBoxes = document.querySelectorAll('.box');
for (const gridBox of gridBoxes) {
    gridBox.addEventListener('click', boxmarked,  {once: true})
}

// draw a mark in inner html that's the same as same the player
// kubow targets
// Kim sets player and if true add classList (35:16)
// need some way of updating the index so I can measure it against winning combos
// kubow does const squareArray = Array.from(squares)
// const index = squareArray.indexOf(e.target)
// if not classList.add then .setAttribute("id"
// yeah and marked should be the same as current player
// then check if there is a winner
function boxmarked(e) {
    e.target.innerHTML = "symbol";
    const gridArray = Array.from(gridBoxes)
    const index = gridArray.indexOf(e.target)

    // need to work on indeterminate players; current player is 'one' or 'two'

    if(currentPlayer === 'playerOne') {
        gridArray[index].classList.add('X')
        currentPlayer = 'playerTwo'
      } else {
        gridArray[index].classList.add('O')
        currentPlayer = 'playerOne'
      }

    console.log(e.target.classList[1], index)
    // Then check if the array matches 
}

// need a function that acknowledges whose turn it is
// use current player and other player and allow them to choose marks
// foster does it by determining turn first, and then using boxmarked function
// use css so a new class invokes a new image
// quick sets current player with target ***

let turn = 0
function whosTurn () {


}


// THIS WORKS
// document.getElementById("0").addEventListener("click", displayDate);

// function displayDate() {
//   document.getElementById("0").innerHTML = Date();
// }

//QUICK ... creates an array - can check against winning combinations
const boxes = Array.from(document.getElementsByClassName('box'));
console.log(boxes)

function dink() {
    alert('dink');
}

function bonk() {
    alert('bonk');
}