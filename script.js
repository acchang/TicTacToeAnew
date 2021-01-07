// tic tac toe alternative ... pipe connector, first team to cross the ocean wins
// need to animate connection though

// I need to put event listeners on squares
// get every square to acknowledge if an X or O is clicked
// then removeEventListener() 

//puts even listeners on all squares
const gridBoxes = document.querySelectorAll('.box');
for (const gridBox of gridBoxes) {
    gridBox.addEventListener('click', boxmarked)
}

// draw a mark in inner html that's the same as same the player
// kubow builds an array and then targets
// need some way of updating the index so I can measure it against winning combos
function boxmarked(e) {
    e.target.innerHTML = "yeah";
    e.target.classList.add("marked");
    // const nowBox= e.target;
    // nowBox.classList.add("marked");
    console.log(boxes)
    // nowBox.setAttribute("id", "marked")
}

// need a function that acknowledges whose turn it is



// WEB DEV how to - works
// const boxElements = document.querySelectorAll('[data-box]');
// boxElements.forEach(box => {box.addEventListener('click', bonk, {once: true})
// })

//   KUBOW - this should work too, I just fon't know what the first line does
//   document.addEventListener('DOMContentLoaded', () => {
//       const squares = document.querySelectorAll('.grid div')
//       squares.forEach(square => {square.addEventListener('click', clickOutcome)})
//   })

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