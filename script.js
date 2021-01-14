// 1) CLEAN THIS UP SO BOTH SIDES CAN PLAY AND PLAYERS CAN BE PICKED
//      dropdown menu: 
//      player 1 : symbol / human
//      player 2 : symbol(auto) / type - human dumbAI smartAI
//
// 2) REFACTOR TO CONSOLIDATED, NO NEED TO GENERATE INDEXSELECTED
// 3) DUMB AI
// 4) SMART AI
// need to work on indeterminate players; current player is 'one' or 'two'

let playerTurn

const ECKS_CLASS = 'X'
const CIRCLE_CLASS = 'circle'
const currentClass = playerTurn ? ECKS_CLASS : CIRCLE_CLASS


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

function startGame() {
    stylingOfBoxes.forEach(gridBox => {
        gridBox.classList.remove('X')
        gridBox.classList.remove('O')
        for (const gridBox of stylingOfBoxes) {
            gridBox.addEventListener('click', boxmarked,  {once: true})
        }
    })
}
const arrayfromBoxes = Array.from(document.getElementsByClassName('box'));
const stylingOfBoxes = document.querySelectorAll('.box');

function boxmarked(e) {
    // e.target.innerHTML = "icon goes here";
    const index = arrayfromBoxes.indexOf(e.target)
    
    if(currentPlayer === 'playerOne') {
        arrayfromBoxes[index].classList.add('X')
        currentPlayer = 'playerTwo'
      } else {
        arrayfromBoxes[index].classList.add('O')
        currentPlayer = 'playerOne'
      }

    console.log(e.target.classList[1], index, arrayfromBoxes)
    
    checkWin()
}

// *** FCC does it by passing in board and player. I need the board for the minimax and I need the current player
// he .reduces the board to get an array of the occupied places
// then he also employs an .every and for loop (25:00 in video)

function checkWin() {
    var indexSelected = arrayfromBoxes.reduce((indexSelected, box, idx) => {
        if (box.classList[1] === 'X') {
            indexSelected.push(idx);
        }
        return indexSelected;
    }, []);
    console.log(indexSelected);

   var winner = winningTrios.some(trio => {
       return trio.every(i => indexSelected.includes(i))});

    if (winner === true) {alert ("game won")}
    // then remove all eventlisteners
}

// try refactoring to do as below.
// function checkWin(currentClass) {
//     return WINNING_COMBINATIONS.some(combination => {
//       return combination.every(index => {
//         return cellElements[index].classList.contains(currentClass)
//       })