// To do:
// make choice by radial buttons
// make another winning function to highlight and change color (to black?)
// 1) DUMB AI
// 2) SMART AI

const ECKS_CLASS = 'X'
const OH_CLASS = 'O'

function swapTurns() {
  playerTurn = !playerTurn
};

const winningTrios = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

restartBtn.addEventListener('click', startGame);

let playerTurn

function startGame() {
  swapTurns()
    stylingOfBoxes.forEach(gridBox => {
        gridBox.classList.remove(ECKS_CLASS)
        gridBox.classList.remove(OH_CLASS)
        gridBox.innerHTML = ""
        for (const gridBox of stylingOfBoxes) {
            gridBox.addEventListener('click', boxmarked,  {once: true})
        }
    })
}

const arrayfromBoxes = Array.from(document.getElementsByClassName('box'));
const stylingOfBoxes = document.querySelectorAll('.box');

function boxmarked(e) {
    const index = arrayfromBoxes.indexOf(e.target)
    if(playerTurn) {
        arrayfromBoxes[index].classList.add(ECKS_CLASS)
        e.target.innerHTML = "X"
      } else {
        arrayfromBoxes[index].classList.add(OH_CLASS)
        e.target.innerHTML = "O"
      }

    console.log(e.target.classList[1], index, arrayfromBoxes)
    // why does the alert in checkWin() appear before the added classes that change the box?
    checkWin()
    swapTurns()

    // if radial checked then play dumbAI
    // make an array of where e.target.innerHTML = ""
    // then pick one of the spaces
    // arrayfromBoxes[dumbpick].classList.add(ECKS_CLASS)
    // e.target.innerHTML = "X"
    // checkWin()
}

function checkClass() {
  if(playerTurn) {
  return ECKS_CLASS
} else {
  return OH_CLASS
};}

function checkWin() {
    var indexSelected = arrayfromBoxes.reduce((indexSelected, box, idx) => {
        if (box.classList[1] === checkClass()) {
            indexSelected.push(idx);
        }
        return indexSelected;
    }, []);
    console.log(indexSelected);

   var winner = winningTrios.some(trio => {
       return trio.every(i => indexSelected.includes(i))});

    if (winner === true) {alert ("game won")}
}

